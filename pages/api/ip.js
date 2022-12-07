import os from 'os';
function handle(req, res) {
  const osType = os.type(); //系统类型
  const netInfo = os.networkInterfaces();

  let ip = '';
  if (osType === 'Windows_NT') {
    for (let dev in netInfo) {
      //win7的网络信息中显示为本地连接，win10显示为以太网
      if (dev === '本地连接' || dev === '以太网') {
        for (let j = 0; j < netInfo[dev].length; j++) {
          if (netInfo[dev][j].family === 'IPv4') {
            ip = netInfo[dev][j].address;
            break;
          }
        }
      }
    }
  } else if (osType === 'Linux') {
    ip = netInfo.eth0[0].address;
  } else if (osType === 'Darwin') {
    // mac操作系统
    console.log(netInfo.en0);
    ip = netInfo.en0[1].address;
  } else {
    ip = '127.0.0.1';
  }
  res.status(200).json({ ip: ip });
}

export default handle;
