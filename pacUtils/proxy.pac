function FindProxyForURL(url, host) {
    // if (url === "http://192.168.22.19:4001/login") {
        return "PROXY test-proxy001.onrender.com:3000;PROXY https://test-proxy001.onrender.com:3000; DIRECT";
    // } else {
    //     return "DIRECT";
    // }
}