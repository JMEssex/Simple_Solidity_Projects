pragma solidity ^0.4.17;

contract Inbox {
    bytes32 public message;

    constructor(bytes32 _message) public {
        message = _message;
    }

    function setMessage(bytes32 newMessage) public {
        message = newMessage;
    }
}
