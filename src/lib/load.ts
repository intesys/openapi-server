import fs from "fs";
import yaml from "js-yaml";
import { OpenAPI } from "openapi-types";
import JsonRefs from "json-refs";
import resolveAllOf from "json-schema-resolve-allof";

export default async (file: string): Promise<OpenAPI.Document> => {
  const spec: OpenAPI.Document = await loadYaml(file);
  let resolvedSpec: any = await resolve(spec);
  resolvedSpec = resolveAllOf(resolvedSpec);
  return resolvedSpec as OpenAPI.Document;
};

const loadYaml = async (file: string): Promise<OpenAPI.Document> => {
  return new Promise((resolve: Function, reject: Function) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        return reject(new Error(`Unable to load file ${file}`));
      }
      try {
        const spec: OpenAPI.Document = yaml.safeLoad(data);
        resolve(spec);
      } catch (err) {
        reject(new Error(`Error reading file ${file}`));
      }
    });
  });
};

const resolve = async (spec: OpenAPI.Document): Promise<OpenAPI.Document> => {
  const options = {
    loaderOptions: {
      processContent: function(res: any, callback: Function) {
        callback(null, yaml.safeLoad(res.text));
      },
    },
  };
  const res: any = await JsonRefs.resolveRefs(spec, options);
  return res.resolved as OpenAPI.Document;
};
