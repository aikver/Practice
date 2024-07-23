const express = require('express');
const cors = require('cors'); // เพิ่มการ import แพ็คเกจ cors
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // เปิดใช้งาน CORS

app.use(express.json()); // ส่งข้อมูลแบบ JSON
app.use(express.urlencoded({ extended: true })); // ส่งข้อมูลแบบ URL-encoded

const writeRead = require('./routes/writeRead.js'); // import route สำหรับการเขียน/อ่านข้อมูล
const updateDelete = require('./routes/updateDelete'); // import route สำหรับการอัปเดต/ลบข้อมูล

app.use('/wr', writeRead); // การเรียกใช้หน้า writeRead
app.use('/ud', updateDelete); // การเรียกใช้หน้า updateDelete

app.use('/', function (req, res, next) { // ถ้าไม่ใส่ route ที่ถูกต้อง
    res.sendStatus(404);
});

app.listen(PORT, () =>
    console.log('Server running on port: ' + PORT)
);
