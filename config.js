module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
              mongodbKey: 'mongodb://mangoinspect:la4RJO4EijENzfnjMQ4OKr2sTpqLTmzTFtys1cZq0XAfX6pfySroUY95Fnhf4YyT5UhQXwdD3qkYUtpNZQAxNA==@mangoinspect.documents.azure.com:10255/mongoinspectProd?ssl=true',
              azureStorageConnectionString: 'https://mangoinspectdevo.blob.core.windows.net/',
              azureStorageAccessKey: 'n6wvfVWuNUubC94RAh+Vp9bpAP4XesX66lhhwARwhI7XXs9dLRQrqAH9qutZdcRRpuN/8xb4KpsQA+dNhmy9nA==',
              azureStorageAccount: 'mangoinspectdevo',
              stripeServerKey: 'sk_test_rGmApxU2IwX1QI1KkkRZBtV5',
              stripeClientKey: 'pk_test_Qy30tfLZhKSn4pEFoIo3zeIj',
              nexmoAPIKey:'417dacb1',
              nexmoAPISecret:'d41e76e4ddf9d7f1'
            };

        case 'production':
            return {
              mongodbKey: 'mongodb://mangoinspect:la4RJO4EijENzfnjMQ4OKr2sTpqLTmzTFtys1cZq0XAfX6pfySroUY95Fnhf4YyT5UhQXwdD3qkYUtpNZQAxNA==@mangoinspect.documents.azure.com:10255/mongoinspectProd?ssl=true',
              azureStorageConnectionString: 'https://mangoinspectprod.blob.core.windows.net/',
              azureStorageAccessKey: 'F0ovfgq+ivWzO4cAqCXmB7wRZiJAA8BCIx8Chq4T/VEvPrLentx1dosr9KDmQWMUuUhodDw98EM3xpmZRZVE3g==',
              azureStorageAccount: 'mangoinspectprod',
              stripeServerKey: 'sk_live_cAEIaEXB48tk5Hz7DpAQus11',
              stripeClientKey: 'pk_live_lpH0j5q53cvx2A2xTIyEfQIO',
              nexmoAPIKey:'417dacb1',
              nexmoAPISecret:'d41e76e4ddf9d7f1'
            };

        default:
            throw new Error("Please set environment variable NODE_ENV to either development or production. Eg. export NODE_ENV=development");
    }
};