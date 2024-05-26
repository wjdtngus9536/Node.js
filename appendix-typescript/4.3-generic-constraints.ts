interface ICheckLength<T> {
    length : T;
}

function echo<T extends ICheckLength<number>>(message: T) {
    console.log(message, message.length);
}

echo<string>("hello");
echo([1,2,3])