// common.ts와 각 환경 변수를 합쳐주는 파일
import common from "./common";
import local from "./local";
import dev from "./dev";
import prod from "./prod";

const phase = process.env.NODE_ENV;

let conf = {};
if (phase === 'local') {
    conf = local;
} else if (phase === 'dev') {
    conf = dev;
} else if (phase === 'prod') {
    conf = prod;
}
console.log('this is',conf);

export default () => ({ // load 옵션은 () => ({}) 형태로 값을 주어야 하므로 ()로 객체를 감싸서 넘겨줌
    ...common,
    ...conf,
}); 