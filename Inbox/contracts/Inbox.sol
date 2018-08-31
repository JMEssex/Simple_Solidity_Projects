pragma solidity ^0.4.25;

contract Inbox {
    string public message;

    constructor(string _message) public {
        message = _message;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
