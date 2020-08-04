import fs from "fs";
import yaml from "js-yaml";
import JsonRefs, { JsonRefsOptions } from "json-refs";
import resolveAllOf from "json-schema-resolve-allof";
import { OpenAPI } from "openapi-types";

interface SuperagentResponseMock {
  text: string;
}

export default async (file: string): Promise<OpenAPI.Document> => {
  const spec: OpenAPI.Document = await loadYaml(file);
  let resolvedSpec = await resolve(spec);
  resolvedSpec = resolveAllOf(resolvedSpec);
  return resolvedSpec;
};

const loadYaml = async (file: string): Promise<OpenAPI.Document> => {
  return new Promise((_resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        return reject(new Error(`Unable to load file ${file}`));
      }
      try {
        const spec: OpenAPI.Document = yaml.safeLoad(data) as OpenAPI.Document;
        _resolve(spec);
      } catch (_err) {
        reject(new Error(`Error reading file ${file}`));
      }
    });
  });
};

const resolve = async (spec: OpenAPI.Document): Promise<OpenAPI.Document> => {
  const options: JsonRefsOptions = {
    loaderOptions: {
      processContent: function (
        res: SuperagentResponseMock,
        callback: (str: string) => void
      ) {
        callback(yaml.safeLoad(res.text) as string);
      },
    },
  };
  const res = await JsonRefs.resolveRefs(spec, options);
  return res.resolved as OpenAPI.Document;
};
