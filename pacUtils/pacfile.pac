function FindProxyForURL(url, host) {
    alert('testing log!')
    if(url === "http://192.168.22.19:4001/login"){
        return "PROXY 192.168.22.19:4000";
    }
    if (isRelevantDomain(host, url)) {
        return "PROXY 192.168.22.19:4000";
    } else {
        return "DIRECT";
    }
}

function isRelevantDomain(host, url) {
    var relevantDomains = [
        "yahoo.com",
        "example.com",
    ];
    // var relevantUrls = [
    //     "192.168.22.19:4000/login"
    // ]
    for (var i = 0; i < relevantDomains.length; i++) {
        if (dnsDomainIs(host, relevantDomains[i])) {
            return true;
        }
    }

    return false;
}
