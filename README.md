             (    )              (    )
            (      )            (      )
             |    |              |    |
         .-""-.  .-.         .-""-.  .-""-.
        /     \/   \       /     \/     \
       |       |    |     |       |      |
       |  O  O |    |     |  O  O |  O  O |
       |   ^   |    |     |   ^   |   ^   |
       |  '-'  |    |     |  '-'  |  '-'  |
        \     /      \     \     /     /
         `-._.'        `-._.'    `-._.'
            |              |         |
          __|__          __|__     __|__
         (_____)        (_____)   (_____)
       ~~~~~~~~~~     ~~~~~~~~~~ ~~~~~~~~~~

       -------------------------------
      |   WELCOME TO THE DYSTOPIAN    |
      |          SOCIETY              |
      |                               |
      |    - Resources are scarce    |
      |    - Freedom is limited      |
      |    - Hope is fading          |
      |    - Rebuild or perish       |
      |                               |
      |    Mission begins at         |
      | [37°24'05.7"N 116°52'04.1"W] |
      -------------------------------

Hey, the time you're reading this message, the world has collapsed,
and there are no signs of human life left. However, you can go to
[37°24'05.7"N 116°52'04.1"W] and your new task will begin there.
Your mission is to survive and revive what is left of humanity in a dystopian society,
where every choice is a struggle, and hope is the only thing left to cling to.

# Run on Localhost

## 1. Run Solana Test Validator
Start the Solana test validator on your local machine:
```sh
solana-test-validator
```

## 1. Switch to localhost
```sh
solana config set --url localhost
```

## 2. Create a new account
```sh
solana-keygen new --outfile ~/account2.json
solana airdrop 10 $(solana-keygen pubkey ~/account2.json)
solana balance $(solana-keygen pubkey ~/account2.json)
```

## 3. Set the newly created account
```sh
solana config set --keypair ~/account2.json
```

## 4. Check address
```sh
solana address

- Default account location
- /Users/prashant/.config/solana/id.json 

- Deploy prgram on locahost
- solana program deploy /Users/prashant/Documents/mailfromfuture/backend/target/deploy/mailfromfuture.so