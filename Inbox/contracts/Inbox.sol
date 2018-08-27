pragma solidity ^0.4.25;

contract Inbox {
    string public message;

    function Inbox(string _message) public {
        message = _message;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
