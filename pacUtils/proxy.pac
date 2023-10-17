function FindProxyForURL(url, host) {
    // if (url === "http://192.168.22.19:4001/login") {
        if(host === "test-proxy001.onrender.com" || host === "google.com" || host === "youtube.com"){
            return 'DIRECT'
        }
        return "PROXY test-proxy001.onrender.com:443";
    // } else {
    //     return "DIRECT";
    // }
}