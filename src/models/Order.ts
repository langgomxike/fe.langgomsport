import Status from "./Status";

export default class Order {
    id: string;
    fullName: string;
    phoneNumber: string;
    status: Status | undefined

    constructor(id = "", fullName = "", phoneNumber = "", status: Status | undefined = undefined) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.status = status;
    }
}