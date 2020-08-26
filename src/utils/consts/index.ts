const buildingEnv = ['develop', 'development', 'staging', 'test', 'testing'];

enum ELocales {
  VIETNAMESE = 'vi',
  ENGLISH = 'en'
}

enum EActivation {
  YES = 1,
  NO = 0
}

enum EEnvironments {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  TESTING = 'testing',
  PRODUCTION = 'production'
}

export { buildingEnv, ELocales, EActivation, EEnvironments };
