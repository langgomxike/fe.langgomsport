
export enum LogType {
    "Warning",
    "Error",
    "Info"
}


export default class SLog {

    public static log(type: LogType = LogType.Info, header: string = "", message: string = "", data: unknown = {}) {
        console.group();
        console.log(LogType[type]);
        console.log("Header   ", header?.toUpperCase());
        console.log("Message  ", message);
        console.log("Data     ", data);
        console.groupEnd();
    }
}