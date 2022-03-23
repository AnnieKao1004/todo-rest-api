const connection = require("../services/db");
const AppError = require("../utils/appError");

exports.getAllTodos = (req, res, next) => {
  const sql = "SELECT * FROM todolist";
  connection.query(sql, function (err, data, fields) {
    if (err) {
      return next(new AppError(err));
    }
    res.status(200).json({ status: "success", totalCount: data?.length, data });
  });
};

exports.createTodo = (req, res, next) => {
  if (!req.body) {
    return next(new AppError("No data found", 404));
  }

  const values = [req.body.name, "pending"];
  const sql = "INSERT INTO todolist (name, status) VALUES(?)";
  connection.query(sql, [values], function (err, data, fields) {
    console.log(data, fields);
    if (err) {
      return next(new AppError(err));
    }
    res.status(201).json({ status: "success", message: "data created" });
  });
};

exports.getTodo = (req, res, next) => {
  if (!req.body.id) {
    return next(new AppError("No todo id found", 404));
  }

  const sql = "SELECT * FROM todolist WHERE id = ?";
  connection.query(sql, [req.body.id], function (err, data, fields) {
    if (err) {
      return next(new AppError(err));
    }
    res.status(200).json({
      status: "success",
      data,
    });
  });
};

exports.updateTodo = (req, res, next) => {
  if (!req.body.id) {
    return new next(new AppError("No todo id found", 404));
  }

  let sql = "";
  let values;
  if (!req.body.name) {
    sql = "UPDATE todolist SET status = ? WHERE id = ?";
    values = [req.body.status, req.body.id];
  } else if (!req.body.status) {
    sql = "UPDATE todolist SET name = ? WHERE id = ?";
    values = [req.body.name, req.body.id];
  } else {
    sql = "UPDATE todolist SET name = ?, status = ? WHERE id = ?";
    values = [req.body.name, req.body.status, req.body.id];
  }

  connection.query(sql, values, function (err, data, fields) {
    if (err) {
      return next(new AppError(err));
    }

    res.status(200).json({
      status: "success",
    });
  });
};

exports.deleteTodo = (req, res, next) => {
  if (!req.body.id) {
    return next(new AppError("No todo id found", 404));
  }

  const sql = "DELETE FROM todolist WHERE id = ?";
  connection.query(sql, [req.body.id], function (err) {
    if (err) return next(new AppError(err, 500));

    res.status(201).json({
      status: "success",
      message: "todo deleted!",
    });
  });
};
