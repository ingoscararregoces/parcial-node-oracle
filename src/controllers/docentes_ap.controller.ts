import { Request, Response } from "express";
import { ConenectionDb } from "../config/server";

const createDocente = async ({ body }: Request, res: Response) => {
  const { programa, sexo, profesion, estado, nombre } = body;
  if (!programa || !sexo || !profesion || estado === null || !nombre)
    return res.status(400).send({ error: "Todos los campos son requeridos" });
  const connection = await ConenectionDb();
  try {
    await connection.execute(
      "INSERT INTO docentes_ap (nombre, programa, sexo, profesion, estado) VALUES ( :nombre, :programa, :sexo, :profesion, :estado)",
      [nombre, programa, sexo, profesion, estado]
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
const findDocentes = async (req: Request, res: Response) => {
  const connection = await ConenectionDb();
  try {
    // const result = await connection.execute("SELECT * FROM docentes_ap");
    // return res.status(200).send(result.rows);
    return res.status(200).send({message: 'PRUEBA DE AMADOR'});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en consulta" });
  } finally {
    await connection.close();
  }
};
const findDocente = async ({ params }: Request, res: Response) => {
  const connection = await ConenectionDb();
  const { id } = params;
  try {
    const result = await connection.execute(
      "SELECT * FROM docentes_ap WHERE docentes_id = :id",
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
const updateDocente = async ({ params, body }: Request, res: Response) => {
  const { programa, sexo, profesion, estado, nombre } = body;
  const { id } = params;
  if (!id) return res.status(400).send({ error: "Se requiere una ID" });
  if (!programa || !sexo || !profesion || estado === null || !nombre)
    return res.status(400).send({ error: "Todos los campos son requeridos" });
  const connection = await ConenectionDb();
  try {
    const result = await connection.execute(
      "UPDATE docentes_ap SET nombre = :nombre, programa = :programa, sexo = :sexo, profesion = :profesion, estado = :estado WHERE docentes_id = :id",
      [nombre, programa, sexo, profesion, estado, id]
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
const deleteDocente = async ({ params }: Request, res: Response) => {
  const { id } = params;
  const connection = await ConenectionDb();
  try {
    await connection.execute("DELETE docentes_ap WHERE docentes_id = :id", [
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
const deleteDocentes = async (req: Request, res: Response) => {
  const connection = await ConenectionDb();
  try {
    await connection.execute("DELETE FROM docentes_ap");
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
  createDocente,
  findDocentes,
  findDocente,
  updateDocente,
  deleteDocente,
  deleteDocentes,
};
