import { Request, Response } from "express";
import { ConenectionDb } from "../config/server";

const createLinea = async ({ body }: Request, res: Response) => {
  const { nombre, estado } = body;
  if (estado === null || !nombre)
    return res.status(400).send({ error: "Todos los campos son requeridos" });
  const connection = await ConenectionDb();
  try {
    await connection.execute(
      "INSERT INTO lineas_apitre (nombre, estado) VALUES ( :nombre, :estado)",
      [nombre, estado]
    );
    await connection.commit();

    return res.status(200).send({ message: "Creado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en consulta" });
  } finally {
    await connection.close();
  }
};
const findLineas = async (req: Request, res: Response) => {
  const connection = await ConenectionDb();
  try {
    const result = await connection.execute("SELECT * FROM lineas_apitre");
    return res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en consulta" });
  } finally {
    await connection.close();
  }
};
const findLinea = async ({ params }: Request, res: Response) => {
  const connection = await ConenectionDb();
  const { id } = params;
  try {
    const result = await connection.execute(
      "SELECT * FROM lineas_apitre WHERE id = :id",
      [id]
    );
    return res
      .status(200)
      .send(
        result.rows.length === 0
          ? { message: "No se encontraron registros con la ID proporcionada" }
          : result.rows
      );
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en consulta" });
  } finally {
    await connection.close();
  }
};
const updateLinea = async ({ params, body }: Request, res: Response) => {
  const { nombre, estado } = body;
  const { id } = params;
  if (!id) return res.status(400).send({ error: "Se requiere una ID" });
  if ( estado === null || !nombre)
    return res.status(400).send({ error: "Todos los campos son requeridos" });
  const connection = await ConenectionDb();
  try {
    const result = await connection.execute(
      "UPDATE lineas_apitre SET nombre = :nombre, estado = :estado WHERE id = :id",
      [nombre, estado, id]
    );
    await connection.commit();
    return res.status(200).send({ message: "Actualizado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en consulta" });
  } finally {
    await connection.close();
  }
};
const deleteLinea = async ({ params }: Request, res: Response) => {
  const { id } = params;
  const connection = await ConenectionDb();
  try {
    await connection.execute("DELETE lineas_apitre WHERE id = :id", [
      id,
    ]);
    await connection.commit();
    return res.status(200).send({ message: "Eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en consulta" });
  } finally {
    await connection.close();
  }
};
const deleteLineas = async (req: Request, res: Response) => {
  const connection = await ConenectionDb();
  try {
    await connection.execute("DELETE FROM lineas_apitre");
    await connection.commit();
    return res.status(200).send({ message: "Todos los registros fueron eliminados" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en consulta" });
  } finally {
    await connection.close();
  }
};

export {
  createLinea,
  findLineas,
  findLinea,
  updateLinea,
  deleteLinea,
  deleteLineas,
};
