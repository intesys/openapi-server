import { specs, MOCKS_PATH } from "./lib/globals";
import openApiSchemaValidate from "./lib/openApiSchemaValidate";
import openApiVersion from "./lib/openApiVersion";
import { get } from "lodash";
import load from "./lib/load";
import { log } from "util";
import Version from "./types/openApiVersion";
import { getV2BasePath } from "./routes/v2";
import { getV3BasePath } from "./routes/v3";
const fs = require('fs');
const path = require('path');
const Swagmock = require('swagmock');

const allowedMethods = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"];

const generateMocks = async (): Promise<void> => 
    new Promise(async (resolve, reject) => {
        try {

        // STATIC && router.use(STATIC_PREFIX, handleStatic(STATIC_PATH));
        // const prefix = getPrefix(API_PREFIX);
        const specDocs = await Promise.all(specs.map(spec => load(spec)));

        specDocs.forEach(spec => {
            const version = openApiVersion(spec);
            // const title = get(spec, "info.title") || "";
            const paths = get(spec, "paths", {});
            let basePath= "";

            switch (version) {
                case Version.v2:
                    basePath = getV2BasePath(spec);
                    break;
                case Version.v3:
                    basePath = getV3BasePath(spec);
                    break;
            }

            Object.keys(paths).forEach(routePath => {
                Object.keys(paths[routePath]).forEach(async (method) => {
                    method = method.toLowerCase();
                    if (allowedMethods.indexOf(method.toUpperCase()) >= 0) {
                        const mockFilename = method + "-generated.json";

                        const fileDirPath = path.join(MOCKS_PATH, basePath, routePath);
                        const filePath = path.join(fileDirPath, mockFilename);

                        let pathLogMessage = "Creating " + filePath + " => ";

                        const pathInfo = paths[routePath][method];

                        const okResponse = pathInfo["responses"]["200"];

                        if (okResponse !== undefined) {
                            let jsonResponse = {};
                            if (okResponse.schema !== undefined && okResponse.schema.example !== undefined) {
                                jsonResponse = okResponse.schema.example;
                                pathLogMessage += "Example Founded";
                            } else {
                                const mockGenerator = Swagmock(spec);

                                jsonResponse = await mockGenerator.responses({
                                    path: routePath,
                                    operation: method,
                                    response: 200,
                                })

                                pathLogMessage += "Mock Generated from Response Declaration";
                                jsonResponse = JSON.stringify(jsonResponse);
                            }

                            console.log(pathLogMessage);

                            fs.mkdirSync(fileDirPath, { recursive: true });
                            fs.writeFileSync(filePath, jsonResponse);
                        }
                    } else {
                        log("The method " + method + " is not allowed.")
                    }
                });
            });
        })

        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    })


export default generateMocks;