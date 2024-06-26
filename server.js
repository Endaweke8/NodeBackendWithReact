import  express  from "express";
import mysql from "mysql";
import cors from 'cors';


const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

app.get('/',(req,res)=>{
    const sql="SELECT * FROM students";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:err});
        return res.json(result);
    })
})
app.post('/student',(req,res)=>{
    const sql="INSERT INTO students (`name`,`email`) VALUES(?)";
   console.log(req.body.email)

    const values=[
        req.body.name,
        req.body.email
    ]

    db.query(sql,[values],(err,result)=>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json(result)
        }
    })
})

app.get('/view/:id',(req,res)=>{
    const sql="SELECT * FROM students WHERE id= ? ";
    const id=req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:err});
        return res.json(result);
    })
})

app.put('/update/:id',(req,res)=>{
    const sql="UPDATE students SET `name`=? ,`email`=? WHERE id= ? ";
    const id=req.params.id;
    db.query(sql,[re.body.name,req.body.email,id],(err,result)=>{
        if(err) return res.json({Message:err});
        return res.json(result);
    })
})

app.delete('/delete/:id',(req,res)=>{
    const sql="DELETE from students  WHERE id= ? ";
    const id=req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:err});
        return res.json(result);
    })
})

app.listen(8081,()=>{
    console.log("This is the nodejs backend , hi");
})