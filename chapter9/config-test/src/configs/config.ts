// common.ts와 각 환경 변수를 합쳐주는 파일
import common from "./common";
import local from "./local";
import dev from "./dev";
import prod from "./prod";
// YAML파일은 커스텀 설정 파일로 취급하므로 설정 추가 필요
import { readFileSync } from "fs";
import * as yaml from 'js-yaml';

// console.log(typeof(readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf-8')));
const yamlConfig: Record<string, any> = yaml.load(readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf-8'));
// readFileSync의 return은 config.yaml파일 내용의 string
const phase = process.env.NODE_ENV;
// console.log('check:', yamlConfig);

let conf = {};
if (phase === 'local') {
    conf = local;
} else if (phase === 'dev') {
    conf = dev;
} else if (phase === 'prod') {
    conf = prod;
}
console.log('this is', common);

export default () => ({ // load 옵션은 () => ({}) 형태로 값을 주어야 하므로 ()로 객체를 감싸서 넘겨줌
    ...common,
    ...conf,
    ...yamlConfig,
}); 