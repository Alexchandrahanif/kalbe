const { User, Customer, Selling, Product } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        where: {},
        attributes: {
          exclude: ["password"],
        },
        order: [["product_name", "ASC"]],
        limit: limit ? limit : 50,
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          // [Op.or]: [{ product_name: { [Op.iLike]: `%${search}%` } }],
          // [Op.or]: [{ product_code: { [Op.iLike]: `%${search}%` } }],
        };
      }

      if (tanggal) {
        const pagi = moment().format(`${tanggal} 00:00`);
        const masuk = moment().format(`${tanggal} 23:59`);
        pagination.where = {
          createdAt: {
            [Op.between]: [pagi, masuk],
          },
        };
      }

      let dataSelling = await Selling.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataSelling.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Selling",
        data: dataSelling.rows,
        totaldataSelling: dataSelling.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Selling.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Selling Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Selling",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { UserId, ProductId, CustomerId, quantity } = req.body;

      let body = {
        UserId,
        ProductId,
        CustomerId,
        quantity,
      };

      await Selling.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Selling",
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { UserId, ProductId, CustomerId, quantity } = req.body;

      const data = await Selling.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Selling Tidak Ditemukan" };
      }

      let body = {
        UserId,
        ProductId,
        CustomerId,

        quantity,
      };

      await Selling.update(body, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Selling",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Selling.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Selling Tidak Ditemukan" };
      }

      await Selling.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Selling",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
