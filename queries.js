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
        this.items = [];
        this.count = 0;
    }
    push(element) {
        this.items[this.count] = element;
        console.log(`${element} added to ${this.count}`);
        this.count +=1;
        return this.count - 1;
    };
    isEmpty() {
        return this.count === 0;
    }
    pop() {
        if( this.isEmpty() === false ) {
            this.count = this.count -1;
            return this.items.pop();

        }
    }
}

const stack = new Stack();

const getMessageUsingStack = (request, response) => {
    stack.pop()
    pool.query('SELECT data FROM stackmessages WHERE structureid=(SELECT max(structureid) FROM stackmessages)', (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    })
    deleteMessageUsingStack();
    console.log(stack)
};

const createMessageUsingStack = async (request, response) => {
    const {data, agentid, structureid} = request.body;
    stack.push(data);
    pool.query('INSERT INTO stackmessages (data, agentid, structureid) VALUES ($1, $2, $3)',[data, agentid, structureid],(error, results) => {
        if(error) throw error;
        response.status(201).json("Sucessfully created the message!");
        });
    pool.query('INSERT INTO mastertable (data, agentid, structureid) VALUES ($1, $2, $3)',[data, agentid, structureid],(error, results) => {
        if(error) throw error;
        });
        console.log(stack);
}

const deleteMessageUsingStack = (request, response) =>{
    pool.query('DELETE FROM stackmessages WHERE structureid = (SELECT max(structureid) FROM stackmessages)', (error, results) =>{
    });
};


class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    enqueue(element) {
        this.items[this.count] = element;
        console.log(`${element} added to ${this.count}`);
        this.count++;
    }
    isNothing() {
        return this.count - this.lowestCount === 0;
    }
    dequeue() {
        if (this.isNothing()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
}


queue = new Queue();

const createMessageUsingQueue = (request, response) => {
    const {data, agentid, structureid} = request.body;
    queue.enqueue(data)
    pool.query('INSERT INTO queuemessages (data, agentid, structureid) VALUES ($1, $2, $3)',[data, agentid, structureid],(error, results) => {
        if(error) throw error;
        response.status(201).json("Sucessfully created the message!");
        });
    pool.query('INSERT INTO mastertable (data, agentid, structureid) VALUES ($1, $2, $3)',[data, agentid, structureid],(error, results) => {
        if(error) throw error;
        });
    console.log(queue)

}

const deleteMessageUsingQueue = (request, response) => {
    pool.query('DELETE FROM queuemessages WHERE structureid = (SELECT min(structureid) FROM queuemessages)', (error, results) =>{
    });
}

const getMessageUsingQueue = (request, response) => {
    queue.dequeue()
    pool.query('SELECT data FROM queuemessages WHERE structureid=(SELECT min(structureid) FROM queuemessages)', (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    })
    deleteMessageUsingQueue();
    console.log(queue)
}

const getAll = (request, response) => { 
    pool.query('SELECT * FROM mastertable', (error,results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    })
}


module.exports ={
    getMessageUsingStack,
    deleteMessageUsingStack,
    createMessageUsingStack,
    getMessageUsingQueue,
    deleteMessageUsingQueue,
    createMessageUsingQueue,
    getAll
};
