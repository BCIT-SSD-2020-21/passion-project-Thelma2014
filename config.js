const config = {
    storage: {
      REGION: "us-east-1",
      BUCKET: "door-to-door-app-upload",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://j2j36kmec1.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_5pPzZgheT",
      APP_CLIENT_ID: "7qkti12m1j9ib9fsf2spc7vgkv",
      IDENTITY_POOL_ID: "us-east-1:f16807bb-9c36-4e0f-8a30-9ec56ca34e3c",
    },
  };
  
  export default config;