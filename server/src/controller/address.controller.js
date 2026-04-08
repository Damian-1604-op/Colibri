import { asyncHandler } from "../../utils/asyncHandler.js";
import pool from "../db.js";

export const getAllAddress = asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM userAddress");
  res.json(result.rows);
});

export const getAddressById = asyncHandler(async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM userAddress WHERE id_addres = $1",
    [req.params.id],
  );

  res.json(result.rows);
});

export const createAddres = asyncHandler(async (req, res) => {
  const { addres, isPrincipal, id_user } = req.body;
  const queryText =
    "INSERT INTO addres (addres, isPrincipal, userDir) values ($1,$2,$3) RETURNING *";

  const result = await pool.query(queryText, [addres, isPrincipal, id_user]);
  res
    .status(200)
    .json({ message: "Direccion agregada con exito", addres: result.rows });
});

export const updateAddres = asyncHandler(async (req, res) => {
  const { addres, isPrincipal } = req.body;
  const queryText =
    "UPDAT addres SET addres = $1, isPrincipal = $2 WHERE id_addres = $3 RETURNING *";

  const result = await pool.query(queryText, [
    addres,
    isPrincipal,
    req.params.id,
  ]);

  res
    .status(201)
    .json({ message: "Direccion actualizada con exito", addres: result.rows });
});

export const deleteAddres = asyncHandler(async (req, res) => {});
