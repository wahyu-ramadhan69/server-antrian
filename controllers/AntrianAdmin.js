import Antrian from "../models/Antrian.js";
import Users from "../models/UserModel.js";
import Loket from "../models/Loket.js";

export const getAntrian = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const loket = parseInt(req.query.loket);

  const date_time = new Date();
  let date = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  const sekarang = year + "-" + month + "-" + date;

  const offset = limit * page;
  const totalRows = await Antrian.count({
    where: { loket: loket, createdAt: sekarang, status: "0" },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Antrian.findAll({
    where: { loket: loket, createdAt: sekarang, status: "0" },
    offset: offset,
    limit: limit,
    order: [["nomer", "ASC"]],
    include: {
      model: Users,
    },
  });

  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
    loket: loket,
  });
};

export const tambahAntrian = async (req, res) => {
  const loket = req.body.loket;
  const id_user = req.body.id_user;
  const date_time = new Date();
  let date = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  const sekarang = year + "-" + month + "-" + date;
  try {
    const NL = await Loket.findAll({
      where: {
        nomer_loket: loket,
      },
    });

    if (NL[0].status === 0) {
      return res.status(400).json({ msg: "Loket antrian belum di buka" });
    }

    const data = await Antrian.findAll({
      limit: 1,
      where: {
        loket: loket,
      },
      order: [["id", "DESC"]],
    });

    if (data.length < 1) {
      const nomer = 1;
      const antrian = await Antrian.create({
        id_user,
        nomer,
        loket,
      });
      return res.status(200).json({ msg: "berhasil menambahkan antrian" });
    }

    const cek = await Antrian.findAll({
      limit: 1,
      where: { id_user: req.body.id_user, createdAt: sekarang },
      order: [["id", "DESC"]],
    });

    if (cek.length > 0) {
      if (cek[0].status === 0) {
        return res
          .status(400)
          .json({ msg: "kamu masih memiliki antrian yang belum diselesaikan" });
      }
    }
    if (data[0].createdAt === sekarang) {
      const nomer = data[0].nomer + 1;
      await Antrian.create({
        id_user,
        nomer,
        loket,
      });
    } else {
      const nomer = 1;
      await Antrian.create({
        id_user,
        nomer,
        loket,
      });
    }
    res.json({ msg: "berhasil menambahkan data ke antrian" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAntrianUser = async (req, res) => {
  const date_time = new Date();
  let date = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  const sekarang = year + "-" + month + "-" + date;

  try {
    const data = await Antrian.findAll({
      limit: 1,
      where: { id_user: req.params.id, createdAt: sekarang },
      order: [["id", "DESC"]],
    });
    if (data.length === 0) {
      res.status(200).json({ msg: "data tidak ditemukan" });
    } else {
      const id = data[0].id;
      const status = data[0].status;
      const loket = data[0].loket;
      const nomer = data[0].nomer;
      res.status(200).json({ loket, status, nomer, id });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const pembatalanAntrian = async (req, res) => {
  const id = req.params.id;
  try {
    await Antrian.update({ status: "1" }, { where: { id: id } });
    res.status(200).json({ msg: "berhasil membatalkan antrian" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const selesaiAntrian = async (req, res) => {
  const id = req.params.id;
  try {
    await Antrian.update({ status: "1" }, { where: { id: id } });
    res.status(200).json({ msg: "antrian selesai" });
  } catch (error) {
    res.status(500).json(error);
  }
};
