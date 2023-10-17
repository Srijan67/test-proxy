function FindProxyForURL(url, host) {
    if (shExpMatch(host, "test-proxy001.onrender.com") || shExpMatch(host, "www.google.com") || shExpMatch(host, "youtube.com")) {
        return "DIRECT";
    }

    // Check for specific HTTP URLs that should bypass the proxy
    if (shExpMatch(url, "http://192.168.22.19:4001/login*")) {
        return "DIRECT";
    }

    // Check for specific HTTPS URLs that should bypass the proxy
    if (shExpMatch(url, "https://www.google.com*")) {
        return "DIRECT";
    }
    if (url.indexOf("http://") === 0) {
            return "PROXY test-proxy001.onrender.com:80";
        }

    // For all other cases, use the proxy
    return "PROXY test-proxy001.onrender.com:443";
}