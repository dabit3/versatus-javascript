import { formatAmountToHex } from '../index.js';
import { formatHexToAmount, formatVerse } from '../lib/utils.js';
console.log('formatVerse');
console.log('60094274544732554888424');
console.log(formatVerse('60094274544732554888424'));
console.log(formatVerse(formatAmountToHex('60094.274544732554888424')));
console.log();
console.log('formatAmountToHex');
console.log();
console.log('0');
console.log(formatAmountToHex(0));
console.log(formatAmountToHex('0'));
console.log();
console.log('0.00000000001');
console.log(formatAmountToHex('0.00000000001'));
console.log(formatAmountToHex(0.00000000001));
console.log();
console.log('1.234234');
console.log(formatAmountToHex('1.234234'));
console.log(formatAmountToHex(1.234234));
console.log();
console.log('1');
console.log(formatAmountToHex('1'));
console.log(formatAmountToHex(1));
console.log();
console.log('10');
console.log(formatAmountToHex('10'));
console.log(formatAmountToHex(10));
console.log();
console.log('23543.2388383737');
console.log(formatAmountToHex(23543.2388383737));
console.log(formatAmountToHex('23543.2388383737'));
console.log();
console.log('1231243.12');
console.log(formatAmountToHex(1231243.12));
console.log(formatAmountToHex('1231243.12'));
console.log();
console.log();
console.log('formatHexToAmount');
console.log('0x0000000000000000000000000000000000000000000000000000000000000000');
console.log(formatHexToAmount('0x0000000000000000000000000000000000000000000000000000000000000000'));
console.log();
console.log('0x0000000000000000000000000000000000000000000000000000000000989680');
console.log(formatHexToAmount('0x0000000000000000000000000000000000000000000000000000000000989680'));
console.log();
console.log('0x0000000000000000000000000000000000000000000000000de0b6b3a7640000');
console.log(formatHexToAmount('0x0000000000000000000000000000000000000000000000000de0b6b3a7640000'));
console.log();
console.log('0x0000000000000000000000000000000000000000000000001120e148a3b5a000');
console.log(formatHexToAmount('0x0000000000000000000000000000000000000000000000001120e148a3b5a000'));
console.log();
console.log('0x0000000000000000000000000000000000000000000000008ac7230489e80000');
console.log();
console.log('0x0000000000000000000000000000000000000000000000008ac7230489e80000');
console.log(formatHexToAmount('0x0000000000000000000000000000000000000000000000008ac7230489e80000'));
console.log();
console.log('0x0000000000000000000000000000000000000000000004fc4812aa1354c00000');
console.log(formatHexToAmount('0x0000000000000000000000000000000000000000000004fc4812aa1354c00000'));
console.log();
console.log(formatHexToAmount(formatAmountToHex('1231243.12'), 18));
