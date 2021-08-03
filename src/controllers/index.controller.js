const {Pool} = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'maussadaniel',
    database: 'myfirstapi'
})
const getUsers=async(req, res)=>{
    const response= await pool.query('SELECT * FROM users');
    console.log(response.rows);
    res.status(200).json(response.rows);
}
const getUserById=async(req, res)=>{
    const response= await pool.query(`SELECT * FROM users WHERE id= ${req.params.id}`);
    res.json(response.rows);
}
const createUser = async (req, res)=>{
    const {name, email}= req.body;
    const response=await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name,email]);
    console.log(response);
    res.json({
        message: 'User added successfuly',
        body: {
            user: {
                name, 
                email
            }
        }
    })
}
const deleteUser = async (req, res)=>{
    const id = req.params.id;
    const response=await pool.query('DELETE FROM users WHERE id = $1', [id]);
    console.log(response)
    res.json(`User ${id} deleted successfuly`)
}

const updateUser = async (req, res)=>{
    const {name, email}=req.body;
    const id= req.params.id;
    const response = await pool.query('UPDATE users SET name = $1, email=$2 WHERE id=$3',[name, email, id])
    console.log(response)
    res.json({
        message: "User updated",
        data:{
            name,
            email
        }
    })
}
module.exports={
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}