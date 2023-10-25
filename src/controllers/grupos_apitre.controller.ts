import { Request, Response } from "express";
import { ConenectionDb } from "../config/server";

const createGrupo = async ({ body }: Request, res: Response) => {

  const { nombre, director, estado, lineas_apitre_id } = body;
  if (!nombre || !director || estado === null || !lineas_apitre_id)
    return res.status(400).send({ error: "Todos los campos son requeridos" });
  const connection = await ConenectionDb();
  try {
    await connection.execute(
      "INSERT INTO grupos_apitre (nombre, director, estado, lineas_apitre_id) VALUES (:nombre, :director, :estado, :lineas_apitre_id)",
      [nombre, director, estado, lineas_apitre_id]
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
const findGrupos = async (req: Request, res: Response) => {
  const connection = await ConenectionDb();
  try {
    const result = await connection.execute("SELECT * FROM grupos_apitre");
    return res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en consulta" });
  } finally {
    await connection.close();
  }
};
const findGrupo = async ({ params }: Request, res: Response) => {
  const connection = await ConenectionDb();
  const { id } = params;
  try {
    const result = await connection.execute(
      "SELECT * FROM grupos_apitre WHERE id = :id",
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
const updateGrupo = async ({ params, body }: Request, res: Response) => {
  const { nombre, director, estado, lineas_apitre_id } = body;
  const { id } = params;
  if (!id) return res.status(400).send({ error: "Se requiere una ID" });
  if (!nombre || !director || estado == null || !lineas_apitre_id)
    return res.status(400).send({ error: "Todos los campos son requeridos" });
  const connection = await ConenectionDb();
  try {
    await connection.execute(
      "UPDATE grupos_apitre SET nombre = :nombre, director = :director, estado = :estado, lineas_apitre_id = :lineas_apitre_id WHERE id = :id",
      [nombre, director, estado, lineas_apitre_id, id]
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
const deleteGrupo = async ({ params }: Request, res: Response) => {
  const { id } = params;
  const connection = await ConenectionDb();
  try {
    await connection.execute("DELETE grupos_apitre WHERE id = :id", [
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
const deleteGrupos = async (req: Request, res: Response) => {
  const connection = await ConenectionDb();
  try {
    await connection.execute("DELETE FROM grupos_apitre");
    await connection.commit();
    return res
      .status(200)
      .send({ message: "Todos los registros fueron eliminados" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en consulta" });
  } finally {
    await connection.close();
  }
};

export {
  createGrupo,
  findGrupo,
  findGrupos,
  updateGrupo,
  deleteGrupo,
  deleteGrupos,
};
