
import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css'
import { ethers } from "ethers";

function App() {

  const address = "0x6809CdEc68B00d4237fD523D0817256491c2eCDF";
  const abi = [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "list_Of_Candidates",
          "type": "string[]"
        }
      ],
      "name": "setCandidateList",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "voteFor",
          "type": "string"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidate_list",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "vote_count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  let signer = provider.getSigner();
  let contract = new ethers.Contract(address, abi, signer);

  async function connectWallet() {

    if (window.ethereum) {
      await provider.send('eth_requestAccounts', []);
      document.getElementById('wallet').innerHTML = (await signer.getAddress()).substring(0, 5) + "..." + (await signer.getAddress()).substring(37, 42);

    }
  }
  async function vote(event) {
    event.preventDefault();
    let preference = document.getElementById('inlineFormCustomSelect').value;

    try{await contract.vote(preference);
    }
    catch(err){
      document.getElementById('error').innerHTML=err.error['message'];
    }
    

  }

  async function vote_count(){
    for(let i=0;i<5;i++){
      let candidate=(await contract.candidate_list(i));
      let vote_no= await contract.vote_count(candidate);
      document.getElementById(candidate).innerHTML=vote_no;
    }


  }
  vote_count();



  return (
    <>


      <nav class="navbar navbar-dark bg-dark mx-2 my-2 rounded">
        <a class="navbar-brand mx-5">Polling Dapp</a>

        <button class="btn btn-success my-2 my-sm-0 mx-5" id='wallet' onClick={connectWallet}>Connect Wallet</button>

      </nav>

      <div class="container">
        <div class="row">
          <div class="col-sm">

          </div>


          <div class="col-sm">
            <form>
              <div class="form-row align-items-center">
                <div class="col-auto my-1">
                  <label class="mr-sm-2" for="inlineFormCustomSelect">List Of Candidates</label> <br /><br />
                  <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                    <option selected>Choose...</option>
                    <option value="candidate 1">candidate 1</option>
                    <option value="candidate 2">candidate 2</option>
                    <option value="candidate 3">candidate 3</option>
                    <option value="candidate 4">candidate 4</option>
                    <option value="candidate 5">candidate 5</option>
                  </select>
                </div>
                <br />
                <div class="col-auto my-1">
                  <button type="submit" class="btn btn-primary" onClick={vote}>Vote</button>
                  <p id='error'></p>
                </div>
              </div>
            </form>
          </div>



          <div class="col-sm">

          </div>



          <table class="table">
            <thead class="thead-dark">
              <tr>
                
                <th scope="col">Candidate Name</th>
                <th scope="col">Total Votes</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                
                <td>candidate 1</td>
                <td id='candidate 1'></td>
                
              </tr>
              <tr>
                
                <td>candidate 2</td>
                <td id='candidate 2'></td>
                
              </tr>
              <tr>
                
                <td>candidate 3</td>
                <td id='candidate 3'></td>
                
              </tr>

              <tr>
                
                <td>candidate 4</td>
                <td id='candidate 4'></td>
                
              </tr>

              <tr>
                
                <td>candidate 5</td>
                <td id='candidate 5'></td>
                
              </tr>
            </tbody>
          </table>

          
        </div>
      </div>




    </>


  );
}

export default App;
