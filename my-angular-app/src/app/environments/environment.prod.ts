export const environment = {
  production: true,
  UserDetailsapiUrl: 'http://fyp-load-balancer-backend-eeb6b2ee02c9c9e8.elb.eu-north-1.amazonaws.com:5001',
  CheckLoginapiUrl: 'http://fyp-load-balancer-backend-eeb6b2ee02c9c9e8.elb.eu-north-1.amazonaws.com:5003',
  SendTrainingDataapiUrl: 'http://fyp-load-balancer-backend-eeb6b2ee02c9c9e8.elb.eu-north-1.amazonaws.com:5005',
  ReceiveModelDataApiUrl: 'http://fyp-load-balancer-backend-eeb6b2ee02c9c9e8.elb.eu-north-1.amazonaws.com:5009',
  GetImagesAndAnnotationsApiUrl: 'http://fyp-load-balancer-backend-eeb6b2ee02c9c9e8.elb.eu-north-1.amazonaws.com:5011',
  SendImagesAndAnnotationsApiUrl: 'http://fyp-load-balancer-backend-eeb6b2ee02c9c9e8.elb.eu-north-1.amazonaws.com:5013',
  SynchModelsToS3Url: 'http://fyp-load-balancer-backend-eeb6b2ee02c9c9e8.elb.eu-north-1.amazonaws.com:5015',
  StartAutomaticTraining: 'http://localhost:5019',
  ShowInspectionDetailsApiUrl: 'http://localhost:5023',
  featureFlag: true
};
