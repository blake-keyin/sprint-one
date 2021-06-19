const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sprint_one',
    password: 'postgres',
    port: 5432
});

class Stack{
    constructor() {
        this.items = []
        this.count = 0
    }

    push(element) {
        this.this[this.count] = element
        console.log(`${element} added to ${this.count}`)
        this.count +=1
        try {
            createUser(null, null, element)
        }
        catch(error){
            console.error(error)
        }
        return this.count - 1 
    }
}

const stack = new Stack();

const createUserUsingStack = (request, response)=>{
    let data, agentid, structureid
    data = request.body.data
    agentid = request.body.agentid
    structureid = request.body.structureid;

const element = { agentid, structureid, data }
stack.push(element)

pool.query('INSERT INTO agent (data, agentid, structureid) VALUES ($1, $2, $3)',
[data, agentid, structureid],
(error, results) => {
    if(error) throw error
    response.status(201).json("Sucessfully created the User!");
    });
}


module.exports ={
    createUserUsingStack : createUserUsingStack
};