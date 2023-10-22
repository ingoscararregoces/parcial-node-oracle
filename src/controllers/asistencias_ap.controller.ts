import { Request, Response } from "express";
import { ConenectionDb } from "../config/server";

const createAsistencia = async ({ body }: Request, res: Response) => {
  
  const { fecha, curso, codigoqr, estado,  docentes_id } = body;
  if (!fecha || !curso || !codigoqr || estado == null || !docentes_id)
    return res.status(400).send({ error: "Todos los campos son requeridos" });
  const connection = await ConenectionDb();
  try {
    await connection.execute(
      "INSERT INTO asistencias_ap (fecha, curso, codigoqr, estado, docentes_id) VALUES ( :fecha, :curso, :codigoqr, :estado, :docentes_id)",
      [fecha, curso, codigoqr, estado, docentes_id]
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
const findAsistencias = async (req: Request, res: Response) => {
  const connection = await ConenectionDb();
  try {
    // const result = await connection.execute("SELECT * FROM asistencias_ap");
    const result = await connection.execute(`
    SELECT a.asistencias_id, a.fecha, a.curso, a.codigoqr, a.estado, d.docentes_id, d.nombre, d.programa, d.sexo, d.profesion
    FROM asistencias_ap a
    JOIN docentes_ap d ON a.docentes_id = d.docentes_id
    `);

    return res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en consulta" });
  } finally {
    await connection.close();
  }
};
const findAsistencia = async ({ params }: Request, res: Response) => {
  const connection = await ConenectionDb();
  const { id } = params;
  try {
    const result = await connection.execute(
      "SELECT * FROM asistencias_ap WHERE asistencias_id = :id",
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
const updateAsistencia = async ({ params, body }: Request, res: Response) => {
  const { fecha, curso, codigoqr, estado, docentes_id } = body;
  const { id } = params;
  if (!id) return res.status(400).send({ error: "Se requiere una ID" });
  if (!fecha || !curso || !codigoqr || estado === null || !docentes_id)
    return res.status(400).send({ error: "Todos los campos son requeridos" });
  const connection = await ConenectionDb();
  try {
    await connection.execute(
      "UPDATE asistencias_ap SET fecha = :fecha, curso = :curso, codigoqr = :codigoqr, estado = :estado, docentes_id = :docentes_id WHERE asistencias_id = :id",
      [fecha, curso, codigoqr, estado, docentes_id, id]
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
const deleteAsistencia = async ({ params }: Request, res: Response) => {
  const { id } = params;
  const connection = await ConenectionDb();
  try {
    await connection.execute("DELETE asistencias_ap WHERE asistencias_id = :id", [
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
const deleteAsistencias = async (req: Request, res: Response) => {
  const connection = await ConenectionDb();
  try {
    await connection.execute("DELETE FROM asistencias_ap");
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
  createAsistencia,
  findAsistencia,
  findAsistencias,
  updateAsistencia,
  deleteAsistencia,
  deleteAsistencias,
};
