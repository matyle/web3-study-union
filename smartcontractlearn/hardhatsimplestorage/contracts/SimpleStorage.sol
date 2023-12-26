// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

contract SimpleStorage {
    // boolean,uint default 256,string, int,address, bytes
    // bool hasFavoriteNumber = true;
    // this gets initialzed to zero
    uint256 public favoriteNumber;
    // string favoriteNumberInText = "Five";
    // int256 favoriteNumberInt = -3;
    // address myAddres = 0x1e3a4C70d651f0da40a2409c4eFCd49DF331A9Ff;

    // bytes32 favoriteNumberBytes = "cat"

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    // calldata memory: temporarily exist.call data not modified by function
    //storage:modify and permanent
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        People memory newPeople = People({
            favoriteNumber: _favoriteNumber,
            name: _name
        });
        people.push(newPeople);
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
        //  favoriteNumber = favoriteNumber+1;
        // retrieve();
    }

    // view,pure 查看不消耗 gas
    //但是如果是需要支付 gas 的函数调用了 那就要算他的 gas 了
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}

// 0xd9145CCE52D386f254917e481eB44e9943F39138
