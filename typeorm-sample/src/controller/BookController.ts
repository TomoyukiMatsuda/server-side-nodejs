import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Book } from "../entity/Book";

export class BookController {
  private bookRepository = AppDataSource.getRepository(Book);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.bookRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      return "unregistered book";
    }
    return book;
  }

  // async save(request: Request, response: Response, next: NextFunction) {
  //   const { firstName, lastName, age } = request.body;
  //
  //   const user = Object.assign(new User(), {
  //     firstName,
  //     lastName,
  //     age,
  //   });
  //
  //   return this.userRepository.save(user);
  // }
  //
  // async remove(request: Request, response: Response, next: NextFunction) {
  //   const id = parseInt(request.params.id);
  //
  //   let userToRemove = await this.userRepository.findOneBy({ id });
  //
  //   if (!userToRemove) {
  //     return "this user not exist";
  //   }
  //
  //   await this.userRepository.remove(userToRemove);
  //
  //   return "user has been removed";
  // }
}
