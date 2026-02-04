import {
  defaults,
  options,
  booleans,
  CUSTOM_MIDDLEWARES,
  CUSTOM_MIDDLEWARES_PATH,
  CUSTOM_MIDDLEWARES_NAMES,
} from "./config";

describe("config", () => {
  describe("defaults", () => {
    describe("API configuration", () => {
      it("has API_PORT default of 3000", () => {
        expect(defaults.API_PORT).toBe("3000");
      });

      it("has API_PROTOCOL default of http", () => {
        expect(defaults.API_PROTOCOL).toBe("http");
      });

      it("has API_HOSTNAME default of localhost", () => {
        expect(defaults.API_HOSTNAME).toBe("localhost");
      });

      it("has empty API_YML by default", () => {
        expect(defaults.API_YML).toBe("");
      });

      it("has empty API_PREFIX by default", () => {
        expect(defaults.API_PREFIX).toBe("");
      });
    });

    describe("MOCKS configuration", () => {
      it("has MOCKS enabled by default", () => {
        expect(defaults.MOCKS).toBe(true);
      });

      it("has MOCKS_PATH default of /mocks", () => {
        expect(defaults.MOCKS_PATH).toBe("/mocks");
      });
    });

    describe("PROXY configuration", () => {
      it("has PROXY disabled by default", () => {
        expect(defaults.PROXY).toBe(false);
      });

      it("has PROXY_PROTOCOL default of http", () => {
        expect(defaults.PROXY_PROTOCOL).toBe("http");
      });

      it("has empty PROXY_HOSTNAME by default", () => {
        expect(defaults.PROXY_HOSTNAME).toBe("");
      });

      it("has empty PROXY_PORT by default", () => {
        expect(defaults.PROXY_PORT).toBe("");
      });

      it("has empty PROXY_PREFIX by default", () => {
        expect(defaults.PROXY_PREFIX).toBe("");
      });

      it("has PROXY_FILTER_HEADERS disabled by default", () => {
        expect(defaults.PROXY_FILTER_HEADERS).toBe(false);
      });
    });

    describe("STATIC configuration", () => {
      it("has STATIC disabled by default", () => {
        expect(defaults.STATIC).toBe(false);
      });

      it("has STATIC_PREFIX default of /static", () => {
        expect(defaults.STATIC_PREFIX).toBe("/static");
      });

      it("has STATIC_PATH default of /static", () => {
        expect(defaults.STATIC_PATH).toBe("/static");
      });
    });

    describe("Other configuration", () => {
      it("has SKIP_VALIDATION disabled by default", () => {
        expect(defaults.SKIP_VALIDATION).toBe(false);
      });

      it("has LOG disabled by default", () => {
        expect(defaults.LOG).toBe(false);
      });

      it("has VERBOSE set to 2 by default", () => {
        expect(defaults.VERBOSE).toBe(2);
      });

      it("has WATCH disabled by default", () => {
        expect(defaults.WATCH).toBe(false);
      });
    });
  });

  describe("options", () => {
    it("is an array", () => {
      expect(Array.isArray(options)).toBe(true);
    });

    it("contains all config keys", () => {
      expect(options).toContain("API_YML");
      expect(options).toContain("API_PORT");
      expect(options).toContain("API_PROTOCOL");
      expect(options).toContain("API_HOSTNAME");
      expect(options).toContain("API_PREFIX");
      expect(options).toContain("MOCKS");
      expect(options).toContain("MOCKS_PATH");
      expect(options).toContain("PROXY");
      expect(options).toContain("PROXY_PROTOCOL");
      expect(options).toContain("PROXY_HOSTNAME");
      expect(options).toContain("PROXY_PORT");
      expect(options).toContain("PROXY_PREFIX");
      expect(options).toContain("STATIC");
      expect(options).toContain("STATIC_PREFIX");
      expect(options).toContain("STATIC_PATH");
      expect(options).toContain("SKIP_VALIDATION");
      expect(options).toContain("LOG");
      expect(options).toContain("VERBOSE");
      expect(options).toContain("WATCH");
    });

    it("all values are strings", () => {
      options.forEach((option) => {
        expect(typeof option).toBe("string");
      });
    });
  });

  describe("booleans", () => {
    it("is an array", () => {
      expect(Array.isArray(booleans)).toBe(true);
    });

    it("contains boolean config keys", () => {
      expect(booleans).toContain("MOCKS");
      expect(booleans).toContain("PROXY");
      expect(booleans).toContain("STATIC");
      expect(booleans).toContain("SKIP_VALIDATION");
      expect(booleans).toContain("LOG");
      expect(booleans).toContain("WATCH");
      expect(booleans).toContain("PROXY_FILTER_HEADERS");
    });

    it("does not contain non-boolean keys", () => {
      expect(booleans).not.toContain("API_PORT");
      expect(booleans).not.toContain("API_YML");
      expect(booleans).not.toContain("API_HOSTNAME");
      expect(booleans).not.toContain("PROXY_PORT");
      expect(booleans).not.toContain("VERBOSE");
    });

    it("all values are strings", () => {
      booleans.forEach((bool) => {
        expect(typeof bool).toBe("string");
      });
    });
  });

  describe("CUSTOM_MIDDLEWARES", () => {
    it("has PRE value defined", () => {
      expect(CUSTOM_MIDDLEWARES.PRE).toBeDefined();
    });

    it("has POST value defined", () => {
      expect(CUSTOM_MIDDLEWARES.POST).toBeDefined();
    });

    it("PRE and POST are different values", () => {
      expect(CUSTOM_MIDDLEWARES.PRE).not.toBe(CUSTOM_MIDDLEWARES.POST);
    });
  });

  describe("CUSTOM_MIDDLEWARES_PATH", () => {
    it("is defined as __middlewares__", () => {
      expect(CUSTOM_MIDDLEWARES_PATH).toBe("__middlewares__");
    });
  });

  describe("CUSTOM_MIDDLEWARES_NAMES", () => {
    it("has pre.js for PRE middleware", () => {
      expect(CUSTOM_MIDDLEWARES_NAMES[CUSTOM_MIDDLEWARES.PRE]).toBe("pre.js");
    });

    it("has post.js for POST middleware", () => {
      expect(CUSTOM_MIDDLEWARES_NAMES[CUSTOM_MIDDLEWARES.POST]).toBe("post.js");
    });
  });
});
