/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { ORMLess as Repository } from '../src/ormless';

export namespace Database {
  export namespace Actor {
    export type Name = 'actor';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'actorId';
    export type PrimaryKeyConstriant = 'actor_pkey';
    export type UniqueConstriants = 'actor_pkey';

    export interface WhereUniqueInput {
      actorPkey: Pick<Model, 'actorId'>;
    }

    export interface Model {
      actorId?: number;
      firstName: string;
      lastName: string;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Address {
    export type Name = 'address';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'addressId';
    export type PrimaryKeyConstriant = 'address_pkey';
    export type UniqueConstriants = 'address_pkey';

    export interface WhereUniqueInput {
      addressPkey: Pick<Model, 'addressId'>;
    }

    export interface Model {
      addressId?: number;
      address: string;
      address2: string;
      district: string;
      cityId: number;
      postalCode: string;
      phone: string;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Category {
    export type Name = 'category';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'categoryId';
    export type PrimaryKeyConstriant = 'category_pkey';
    export type UniqueConstriants = 'category_pkey';

    export interface WhereUniqueInput {
      categoryPkey: Pick<Model, 'categoryId'>;
    }

    export interface Model {
      categoryId?: number;
      name: string;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace City {
    export type Name = 'city';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'cityId';
    export type PrimaryKeyConstriant = 'city_pkey';
    export type UniqueConstriants = 'city_pkey';

    export interface WhereUniqueInput {
      cityPkey: Pick<Model, 'cityId'>;
    }

    export interface Model {
      cityId?: number;
      city: string;
      countryId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Country {
    export type Name = 'country';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'countryId';
    export type PrimaryKeyConstriant = 'country_pkey';
    export type UniqueConstriants = 'country_pkey';

    export interface WhereUniqueInput {
      countryPkey: Pick<Model, 'countryId'>;
    }

    export interface Model {
      countryId?: number;
      country: string;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Customer {
    export type Name = 'customer';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'customerId';
    export type PrimaryKeyConstriant = 'customer_pkey';
    export type UniqueConstriants = 'customer_pkey' | 'customer_email_uk';

    export interface WhereUniqueInput {
      customerPkey: Pick<Model, 'customerId'>;
      customerEmailUk: Pick<Model, 'email'>;
    }

    export interface Model {
      customerId?: number;
      storeId: number;
      firstName: string;
      lastName: string;
      email: string;
      addressId: number;
      activebool?: boolean;
      createDate?: Date | string;
      lastUpdate?: Date | string;
      active: number;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Film {
    export type Name = 'film';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'filmId';
    export type PrimaryKeyConstriant = 'film_pkey';
    export type UniqueConstriants = 'film_pkey';

    export interface WhereUniqueInput {
      filmPkey: Pick<Model, 'filmId'>;
    }

    export interface Model {
      filmId?: number;
      title: string;
      description: string;
      releaseYear: number;
      languageId: number;
      originalLanguageId: number;
      rentalDuration?: number;
      rentalRate?: number;
      length: number;
      replacementCost?: number;
      rating?: MPAA_RATING;
      lastUpdate?: Date | string;
      specialFeatures: string[];
      fulltext: string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace FilmActor {
    export type Name = 'film_actor';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'actorId' | 'filmId';
    export type PrimaryKeyConstriant = 'film_actor_pkey';
    export type UniqueConstriants = 'film_actor_pkey';

    export interface WhereUniqueInput {
      filmActorPkey: Pick<Model, 'actorId' | 'filmId'>;
    }

    export interface Model {
      actorId: number;
      filmId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace FilmCategory {
    export type Name = 'film_category';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'filmId' | 'categoryId';
    export type PrimaryKeyConstriant = 'film_category_pkey';
    export type UniqueConstriants = 'film_category_pkey';

    export interface WhereUniqueInput {
      filmCategoryPkey: Pick<Model, 'filmId' | 'categoryId'>;
    }

    export interface Model {
      filmId: number;
      categoryId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Inventory {
    export type Name = 'inventory';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'inventoryId';
    export type PrimaryKeyConstriant = 'inventory_pkey';
    export type UniqueConstriants = 'inventory_pkey';

    export interface WhereUniqueInput {
      inventoryPkey: Pick<Model, 'inventoryId'>;
    }

    export interface Model {
      inventoryId?: number;
      filmId: number;
      storeId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Language {
    export type Name = 'language';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'languageId';
    export type PrimaryKeyConstriant = 'language_pkey';
    export type UniqueConstriants = 'language_pkey';

    export interface WhereUniqueInput {
      languagePkey: Pick<Model, 'languageId'>;
    }

    export interface Model {
      languageId?: number;
      name: string;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Payment {
    export type Name = 'payment';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = never;
    export type PrimaryKeyConstriant = never;
    export type UniqueConstriants = never;

    export interface WhereUniqueInput {}

    export interface Model {
      paymentId?: number;
      customerId: number;
      staffId: number;
      rentalId: number;
      amount: number;
      paymentDate: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Rental {
    export type Name = 'rental';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'rentalId';
    export type PrimaryKeyConstriant = 'rental_pkey';
    export type UniqueConstriants = 'rental_pkey';

    export interface WhereUniqueInput {
      rentalPkey: Pick<Model, 'rentalId'>;
    }

    export interface Model {
      rentalId?: number;
      rentalDate: Date | string;
      inventoryId: number;
      customerId: number;
      returnDate: Date | string;
      staffId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Staff {
    export type Name = 'staff';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'staffId';
    export type PrimaryKeyConstriant = 'staff_pkey';
    export type UniqueConstriants = 'staff_pkey';

    export interface WhereUniqueInput {
      staffPkey: Pick<Model, 'staffId'>;
    }

    export interface Model {
      staffId?: number;
      firstName: string;
      lastName: string;
      addressId: number;
      email: string;
      storeId: number;
      active?: boolean;
      username: string;
      password: string;
      lastUpdate?: Date | string;
      picture: string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Store {
    export type Name = 'store';
    export type Column = keyof Model;
    export type PrimaryKeyColumn = 'storeId';
    export type PrimaryKeyConstriant = 'store_pkey';
    export type UniqueConstriants = 'store_pkey';

    export interface WhereUniqueInput {
      storePkey: Pick<Model, 'storeId'>;
    }

    export interface Model {
      storeId?: number;
      managerStaffId: number;
      addressId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Model> {}

    export interface Select extends Required<Model> {}
  }

  export type MPAA_RATING = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
}

export interface DatabaseSchema {
  actor: Database.Actor.Select;
  address: Database.Address.Select;
  category: Database.Category.Select;
  city: Database.City.Select;
  country: Database.Country.Select;
  customer: Database.Customer.Select;
  film: Database.Film.Select;
  filmActor: Database.FilmActor.Select;
  filmCategory: Database.FilmCategory.Select;
  inventory: Database.Inventory.Select;
  language: Database.Language.Select;
  payment: Database.Payment.Select;
  rental: Database.Rental.Select;
  staff: Database.Staff.Select;
  store: Database.Store.Select;
}

export interface DatabaseMetadata {
  actor: {
    pk: Database.Actor.PrimaryKeyColumn;
    unique: Database.Actor.WhereUniqueInput;
    insert: Database.Actor.Insert;
    update: Database.Actor.Update;
  };
  address: {
    pk: Database.Address.PrimaryKeyColumn;
    unique: Database.Address.WhereUniqueInput;
    insert: Database.Address.Insert;
    update: Database.Address.Update;
  };
  category: {
    pk: Database.Category.PrimaryKeyColumn;
    unique: Database.Category.WhereUniqueInput;
    insert: Database.Category.Insert;
    update: Database.Category.Update;
  };
  city: {
    pk: Database.City.PrimaryKeyColumn;
    unique: Database.City.WhereUniqueInput;
    insert: Database.City.Insert;
    update: Database.City.Update;
  };
  country: {
    pk: Database.Country.PrimaryKeyColumn;
    unique: Database.Country.WhereUniqueInput;
    insert: Database.Country.Insert;
    update: Database.Country.Update;
  };
  customer: {
    pk: Database.Customer.PrimaryKeyColumn;
    unique: Database.Customer.WhereUniqueInput;
    insert: Database.Customer.Insert;
    update: Database.Customer.Update;
  };
  film: {
    pk: Database.Film.PrimaryKeyColumn;
    unique: Database.Film.WhereUniqueInput;
    insert: Database.Film.Insert;
    update: Database.Film.Update;
  };
  filmActor: {
    pk: Database.FilmActor.PrimaryKeyColumn;
    unique: Database.FilmActor.WhereUniqueInput;
    insert: Database.FilmActor.Insert;
    update: Database.FilmActor.Update;
  };
  filmCategory: {
    pk: Database.FilmCategory.PrimaryKeyColumn;
    unique: Database.FilmCategory.WhereUniqueInput;
    insert: Database.FilmCategory.Insert;
    update: Database.FilmCategory.Update;
  };
  inventory: {
    pk: Database.Inventory.PrimaryKeyColumn;
    unique: Database.Inventory.WhereUniqueInput;
    insert: Database.Inventory.Insert;
    update: Database.Inventory.Update;
  };
  language: {
    pk: Database.Language.PrimaryKeyColumn;
    unique: Database.Language.WhereUniqueInput;
    insert: Database.Language.Insert;
    update: Database.Language.Update;
  };
  payment: {
    pk: Database.Payment.PrimaryKeyColumn;
    unique: Database.Payment.WhereUniqueInput;
    insert: Database.Payment.Insert;
    update: Database.Payment.Update;
  };
  rental: {
    pk: Database.Rental.PrimaryKeyColumn;
    unique: Database.Rental.WhereUniqueInput;
    insert: Database.Rental.Insert;
    update: Database.Rental.Update;
  };
  staff: {
    pk: Database.Staff.PrimaryKeyColumn;
    unique: Database.Staff.WhereUniqueInput;
    insert: Database.Staff.Insert;
    update: Database.Staff.Update;
  };
  store: {
    pk: Database.Store.PrimaryKeyColumn;
    unique: Database.Store.WhereUniqueInput;
    insert: Database.Store.Insert;
    update: Database.Store.Update;
  };
}

export class ActorRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'actor'> {
  protected abstract readonly table = 'actor' as const;
  protected abstract readonly primaryKeys = ['actorId'] as const;
}
export class AddressRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'address'> {
  protected abstract readonly table = 'address' as const;
  protected abstract readonly primaryKeys = ['addressId'] as const;
}
export class CategoryRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'category'> {
  protected abstract readonly table = 'category' as const;
  protected abstract readonly primaryKeys = ['categoryId'] as const;
}
export class CityRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'city'> {
  protected abstract readonly table = 'city' as const;
  protected abstract readonly primaryKeys = ['cityId'] as const;
}
export class CountryRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'country'> {
  protected abstract readonly table = 'country' as const;
  protected abstract readonly primaryKeys = ['countryId'] as const;
}
export class CustomerRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'customer'> {
  protected abstract readonly table = 'customer' as const;
  protected abstract readonly primaryKeys = ['customerId'] as const;
}
export class FilmRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'film'> {
  protected abstract readonly table = 'film' as const;
  protected abstract readonly primaryKeys = ['filmId'] as const;
}
export class FilmActorRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'filmActor'> {
  protected abstract readonly table = 'filmActor' as const;
  protected abstract readonly primaryKeys = [] as const;
}
export class FilmCategoryRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'filmCategory'> {
  protected abstract readonly table = 'filmCategory' as const;
  protected abstract readonly primaryKeys = [] as const;
}
export class InventoryRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'inventory'> {
  protected abstract readonly table = 'inventory' as const;
  protected abstract readonly primaryKeys = ['inventoryId'] as const;
}
export class LanguageRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'language'> {
  protected abstract readonly table = 'language' as const;
  protected abstract readonly primaryKeys = ['languageId'] as const;
}
export class PaymentRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'payment'> {
  protected abstract readonly table = 'payment' as const;
  protected abstract readonly primaryKeys = [] as const;
}
export class RentalRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'rental'> {
  protected abstract readonly table = 'rental' as const;
  protected abstract readonly primaryKeys = ['rentalId'] as const;
}
export class StaffRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'staff'> {
  protected abstract readonly table = 'staff' as const;
  protected abstract readonly primaryKeys = ['staffId'] as const;
}
export class StoreRepository extends Repository<DatabaseSchema, DatabaseMetadata, 'store'> {
  protected abstract readonly table = 'store' as const;
  protected abstract readonly primaryKeys = ['storeId'] as const;
}
