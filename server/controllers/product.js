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
          [Op.or]: [{ product_name: { [Op.iLike]: `%${search}%` } }],
          [Op.or]: [{ product_code: { [Op.iLike]: `%${search}%` } }],
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

      let dataProduct = await Product.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataProduct.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Product",
        data: dataProduct.rows,
        totaldataProduct: dataProduct.count,
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

      const data = await Product.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Product Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Product",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { product_name, product_code, quantity, price } = req.body;

      let body = {
        product_name,
        product_code,
        quantity,
        price,
      };

      await Product.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Product",
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { product_name, product_code, quantity, price } = req.body;

      const data = await Product.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Product Tidak Ditemukan" };
      }

      let body = {
        product_name,
        product_code,
        quantity,
        price,
      };

      await Product.update(body, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Product",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Product.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Product Tidak Ditemukan" };
      }

      await Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Product",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
