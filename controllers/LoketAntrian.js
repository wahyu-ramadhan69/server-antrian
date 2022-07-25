import Loket from "../models/Loket.js";

export const AktifkanLoket = async (req, res) => {
  try {
    const nomerLoket = req.body.loket;
    const response = await Loket.findOne({
      where: {
        nomer_loket: nomerLoket,
      },
    });
    const statusLoket = response.status;
    if (statusLoket === 0) {
      await Loket.update(
        { status: "1" },
        { where: { nomer_loket: nomerLoket } }
      );
      const data = await Loket.findOne({
        where: {
          nomer_loket: nomerLoket,
        },
      });
      res.status(200).json({ msg: "Loket dibuka", loket: data.status });
    } else {
      await Loket.update(
        { status: "0" },
        { where: { nomer_loket: nomerLoket } }
      );
      const data = await Loket.findOne({
        where: {
          nomer_loket: nomerLoket,
        },
      });
      res.status(200).json({ msg: "Loket ditutup", loket: data.status });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getLoket = async (req, res) => {
  try {
    const loket = await Loket.findAll({
      attributes: ["nomer_loket", "status"],
    });
    res.json(loket);
  } catch (error) {
    console.log(error);
  }
};

export const getStatusLoket = async (req, res) => {
  const nomer = req.params.id;
  try {
    const data = await Loket.findOne({
      where: { nomer_loket: nomer },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
