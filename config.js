module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
              mongodbKey: 'mongodb://mangoinspectdevo:WH4DaEoMoLvnTNPr0v9tmBhDSI0pNrBTWT4asMGnOAhIHGwDzEpXCjJzlcXzh5pe0Avj1jeqwxpkifFT89HuCQ==@mangoinspectdevo.documents.azure.com:10255/mongoinspectdevo?ssl=true',
              azureStorageConnectionString: 'https://mangoinspectdevo.blob.core.windows.net/',
              azureStorageAccessKey: 'd/5TeLiqQ2klh4ngl8F9uJRtJCNGhIYALiVc7pbVeBANM9L8j+HuW23vUhiTuBENgd95siZd1z8RpGlkZS+xAA==',
              azureStorageAccount: 'mangoinspectdevo',
              stripeServerKey: 'sk_test_rGmApxU2IwX1QI1KkkRZBtV5',
              stripeClientKey: 'pk_test_Qy30tfLZhKSn4pEFoIo3zeIj'
            };

        case 'production':
            return {
              mongodbKey: 'mongodb://mangoinspectprod:iyg6umpzUh0figLW4apCqZJfVbD0jC22Crsgx5IGATpPEDzBA6QguA9u168IP9PTQGdkN9UOvlbUZkvDRNBdiA==@mangoinspectprod.documents.azure.com:10255/mongoinspectprod?ssl=true',
              azureStorageConnectionString: 'https://mangoinspectprod.blob.core.windows.net/',
              azureStorageAccessKey: 'F0ovfgq+ivWzO4cAqCXmB7wRZiJAA8BCIx8Chq4T/VEvPrLentx1dosr9KDmQWMUuUhodDw98EM3xpmZRZVE3g==',
              azureStorageAccount: 'mangoinspectprod',
              stripeServerKey: 'sk_live_cAEIaEXB48tk5Hz7DpAQus11',
              stripeClientKey: 'pk_live_lpH0j5q53cvx2A2xTIyEfQIO'
            };

        default:
            throw new Error("Please set environment variable NODE_ENV to either development or production");
    }
};