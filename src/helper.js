import Web3 from 'web3'

const web3Obj = {
    web3: new Web3(),
    setweb3: function (provider) {
        console.log("PROVIDERRRRRR ", provider);
        web3Obj.web3 = new Web3(new Web3.providers.HttpProvider('https://localhost:8545'));
        sessionStorage.setItem('pageUsingTorus', true)
    },
    initialize: async function () {
        const defaultTorus = await import('@toruslabs/torus-embed');
        const Torus = defaultTorus.default;
        const torus = new Torus();
        await torus.init({buildEnv: 'development'});
        await torus.login();
        web3Obj.setweb3(torus.provider)
    }
};
export default web3Obj
