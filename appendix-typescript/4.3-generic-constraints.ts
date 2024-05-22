interface ICheckLength {
    length : number;
}

function echo<T extends ICheckLength>(message: T) {
    console.log(message, message.length);
}

echo<string>("hello");
echo([1,2,3])