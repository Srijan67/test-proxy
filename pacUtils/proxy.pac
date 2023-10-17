function FindProxyForURL(url, host) {
    // if (url === "http://192.168.22.19:4001/login") {
        if(host === "test-proxy001.onrender.com" || host === "google" || host === "youtube"){
            return 'DIRECT'
        }
        return "PROXY test-proxy001.onrender.com:443";
    // } else {
    //     return "DIRECT";
    // }
}