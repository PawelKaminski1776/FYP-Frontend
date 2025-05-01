export const environment = {
  production: true,
  UserDetailsapiUrl: (window as any).__env?.UserDetailsapiUrl || 'http://localhost:5001',
  CheckLoginapiUrl: (window as any).__env?.CheckLoginapiUrl || 'http://localhost:5003',
  SendTrainingDataapiUrl: (window as any).__env?.SendTrainingDataapiUrl || 'http://localhost:5005',
  ReceiveModelDataApiUrl: (window as any).__env?.ReceiveModelDataApiUrl || 'http://localhost:5009',
  GetImagesAndAnnotationsApiUrl: (window as any).__env?.GetImagesAndAnnotationsApiUrl || 'http://localhost:5011',
  SendImagesAndAnnotationsApiUrl: (window as any).__env?.SendImagesAndAnnotationsApiUrl || 'http://localhost:5013',
  SynchModelsToS3Url: (window as any).__env?.SynchModelsToS3Url || 'http://localhost:5015',
  featureFlag: true
};
