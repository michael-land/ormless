import { CamelCasePlugin, Kysely } from 'kysely';
import { ORMLess, ORMLessQueryable } from '../src/ormless';

/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */

export namespace db {
  export namespace Actor {
    export type TableName = 'actor';

    export type PrimaryKeyConstriant = 'actor_pkey';

    export type UniqueConstriants = 'actor_pkey';

    export interface WhereUniqueInput {
      actorPkey: 'actorId';
    }

    export interface Model {
      actorId?: number;
      firstName: string;
      lastName: string;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Address {
    export type TableName = 'address';

    export type PrimaryKeyConstriant = 'address_pkey';

    export type UniqueConstriants = 'address_pkey';

    export interface WhereUniqueInput {
      addressPkey: 'addressId';
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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Category {
    export type TableName = 'category';

    export type PrimaryKeyConstriant = 'category_pkey';

    export type UniqueConstriants = 'category_pkey';

    export interface WhereUniqueInput {
      categoryPkey: 'categoryId';
    }

    export interface Model {
      categoryId?: number;
      name: string;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace City {
    export type TableName = 'city';

    export type PrimaryKeyConstriant = 'city_pkey';

    export type UniqueConstriants = 'city_pkey';

    export interface WhereUniqueInput {
      cityPkey: 'cityId';
    }

    export interface Model {
      cityId?: number;
      city: string;
      countryId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Country {
    export type TableName = 'country';

    export type PrimaryKeyConstriant = 'country_pkey';

    export type UniqueConstriants = 'country_pkey';

    export interface WhereUniqueInput {
      countryPkey: 'countryId';
    }

    export interface Model {
      countryId?: number;
      country: string;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Customer {
    export type TableName = 'customer';

    export type PrimaryKeyConstriant = 'customer_pkey';

    export type UniqueConstriants = 'customer_email_uk' | 'customer_pkey';

    export interface WhereUniqueInput {
      customerEmailUk: 'email';
      customerPkey: 'customerId';
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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Film {
    export type TableName = 'film';

    export type PrimaryKeyConstriant = 'film_pkey';

    export type UniqueConstriants = 'film_pkey';

    export interface WhereUniqueInput {
      filmPkey: 'filmId';
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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace FilmActor {
    export type TableName = 'film_actor';

    export type PrimaryKeyConstriant = 'film_actor_pkey';

    export type UniqueConstriants = 'film_actor_pkey';

    export interface WhereUniqueInput {
      filmActorPkey: 'filmId' | 'actorId';
    }

    export interface Model {
      actorId: number;
      filmId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace FilmCategory {
    export type TableName = 'film_category';

    export type PrimaryKeyConstriant = 'film_category_pkey';

    export type UniqueConstriants = 'film_category_pkey';

    export interface WhereUniqueInput {
      filmCategoryPkey: 'categoryId' | 'filmId';
    }

    export interface Model {
      filmId: number;
      categoryId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Inventory {
    export type TableName = 'inventory';

    export type PrimaryKeyConstriant = 'inventory_pkey';

    export type UniqueConstriants = 'inventory_pkey';

    export interface WhereUniqueInput {
      inventoryPkey: 'inventoryId';
    }

    export interface Model {
      inventoryId?: number;
      filmId: number;
      storeId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Language {
    export type TableName = 'language';

    export type PrimaryKeyConstriant = 'language_pkey';

    export type UniqueConstriants = 'language_pkey';

    export interface WhereUniqueInput {
      languagePkey: 'languageId';
    }

    export interface Model {
      languageId?: number;
      name: string;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Payment {
    export type TableName = 'payment';

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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace PaymentP2020_01 {
    export type TableName = 'payment_p2020_01';

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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace PaymentP2020_02 {
    export type TableName = 'payment_p2020_02';

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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace PaymentP2020_03 {
    export type TableName = 'payment_p2020_03';

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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace PaymentP2020_04 {
    export type TableName = 'payment_p2020_04';

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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace PaymentP2020_05 {
    export type TableName = 'payment_p2020_05';

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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace PaymentP2020_06 {
    export type TableName = 'payment_p2020_06';

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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Rental {
    export type TableName = 'rental';

    export type PrimaryKeyConstriant = 'rental_pkey';

    export type UniqueConstriants = 'rental_pkey';

    export interface WhereUniqueInput {
      rentalPkey: 'rentalId';
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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Staff {
    export type TableName = 'staff';

    export type PrimaryKeyConstriant = 'staff_pkey';

    export type UniqueConstriants = 'staff_pkey';

    export interface WhereUniqueInput {
      staffPkey: 'staffId';
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

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }
  export namespace Store {
    export type TableName = 'store';

    export type PrimaryKeyConstriant = 'store_pkey';

    export type UniqueConstriants = 'store_pkey';

    export interface WhereUniqueInput {
      storePkey: 'storeId';
    }

    export interface Model {
      storeId?: number;
      managerStaffId: number;
      addressId: number;
      lastUpdate?: Date | string;
    }

    export interface Insert extends Model {}

    export interface Update extends Partial<Insert> {}

    export interface Select extends Required<Model> {}
  }

  export namespace ActorInfo {
    export type ViewName = 'actor_info';

    export interface Model {
      actorId: number;
      firstName: string;
      lastName: string;
      filmInfo: string;
    }

    export interface Select extends Required<Model> {}
  }
  export namespace CustomerList {
    export type ViewName = 'customer_list';

    export interface Model {
      id: number;
      name: string;
      address: string;
      zipCode: string;
      phone: string;
      city: string;
      country: string;
      notes: string;
      sid: number;
    }

    export interface Select extends Required<Model> {}
  }
  export namespace FilmList {
    export type ViewName = 'film_list';

    export interface Model {
      fid: number;
      title: string;
      description: string;
      category: string;
      price: number;
      length: number;
      rating: MPAA_RATING;
      actors: string;
    }

    export interface Select extends Required<Model> {}
  }
  export namespace NicerButSlowerFilmList {
    export type ViewName = 'nicer_but_slower_film_list';

    export interface Model {
      fid: number;
      title: string;
      description: string;
      category: string;
      price: number;
      length: number;
      rating: MPAA_RATING;
      actors: string;
    }

    export interface Select extends Required<Model> {}
  }
  export namespace SalesByFilmCategory {
    export type ViewName = 'sales_by_film_category';

    export interface Model {
      category: string;
      totalSales: number;
    }

    export interface Select extends Required<Model> {}
  }
  export namespace SalesByStore {
    export type ViewName = 'sales_by_store';

    export interface Model {
      store: string;
      manager: string;
      totalSales: number;
    }

    export interface Select extends Required<Model> {}
  }
  export namespace StaffList {
    export type ViewName = 'staff_list';

    export interface Model {
      id: number;
      name: string;
      address: string;
      zipCode: string;
      phone: string;
      city: string;
      country: string;
      sid: number;
    }

    export interface Select extends Required<Model> {}
  }

  export type MPAA_RATING = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
}

export interface Database {
  actor: db.Actor.Select;
  address: db.Address.Select;
  category: db.Category.Select;
  city: db.City.Select;
  country: db.Country.Select;
  customer: db.Customer.Select;
  film: db.Film.Select;
  filmActor: db.FilmActor.Select;
  filmCategory: db.FilmCategory.Select;
  inventory: db.Inventory.Select;
  language: db.Language.Select;
  payment: db.Payment.Select;
  paymentP2020_01: db.PaymentP2020_01.Select;
  paymentP2020_02: db.PaymentP2020_02.Select;
  paymentP2020_03: db.PaymentP2020_03.Select;
  paymentP2020_04: db.PaymentP2020_04.Select;
  paymentP2020_05: db.PaymentP2020_05.Select;
  paymentP2020_06: db.PaymentP2020_06.Select;
  rental: db.Rental.Select;
  staff: db.Staff.Select;
  store: db.Store.Select;
  actorInfo: db.ActorInfo.Select;
  customerList: db.CustomerList.Select;
  filmList: db.FilmList.Select;
  nicerButSlowerFilmList: db.NicerButSlowerFilmList.Select;
  salesByFilmCategory: db.SalesByFilmCategory.Select;
  salesByStore: db.SalesByStore.Select;
  staffList: db.StaffList.Select;
}

export interface DatabaseMetadata {
  actor: {
    unique: db.Actor.WhereUniqueInput;
    insert: db.Actor.Insert;
    update: db.Actor.Update;
  };
  address: {
    unique: db.Address.WhereUniqueInput;
    insert: db.Address.Insert;
    update: db.Address.Update;
  };
  category: {
    unique: db.Category.WhereUniqueInput;
    insert: db.Category.Insert;
    update: db.Category.Update;
  };
  city: {
    unique: db.City.WhereUniqueInput;
    insert: db.City.Insert;
    update: db.City.Update;
  };
  country: {
    unique: db.Country.WhereUniqueInput;
    insert: db.Country.Insert;
    update: db.Country.Update;
  };
  customer: {
    unique: db.Customer.WhereUniqueInput;
    insert: db.Customer.Insert;
    update: db.Customer.Update;
  };
  film: {
    unique: db.Film.WhereUniqueInput;
    insert: db.Film.Insert;
    update: db.Film.Update;
  };
  filmActor: {
    unique: db.FilmActor.WhereUniqueInput;
    insert: db.FilmActor.Insert;
    update: db.FilmActor.Update;
  };
  filmCategory: {
    unique: db.FilmCategory.WhereUniqueInput;
    insert: db.FilmCategory.Insert;
    update: db.FilmCategory.Update;
  };
  inventory: {
    unique: db.Inventory.WhereUniqueInput;
    insert: db.Inventory.Insert;
    update: db.Inventory.Update;
  };
  language: {
    unique: db.Language.WhereUniqueInput;
    insert: db.Language.Insert;
    update: db.Language.Update;
  };
  payment: {
    unique: db.Payment.WhereUniqueInput;
    insert: db.Payment.Insert;
    update: db.Payment.Update;
  };
  paymentP2020_01: {
    unique: db.PaymentP2020_01.WhereUniqueInput;
    insert: db.PaymentP2020_01.Insert;
    update: db.PaymentP2020_01.Update;
  };
  paymentP2020_02: {
    unique: db.PaymentP2020_02.WhereUniqueInput;
    insert: db.PaymentP2020_02.Insert;
    update: db.PaymentP2020_02.Update;
  };
  paymentP2020_03: {
    unique: db.PaymentP2020_03.WhereUniqueInput;
    insert: db.PaymentP2020_03.Insert;
    update: db.PaymentP2020_03.Update;
  };
  paymentP2020_04: {
    unique: db.PaymentP2020_04.WhereUniqueInput;
    insert: db.PaymentP2020_04.Insert;
    update: db.PaymentP2020_04.Update;
  };
  paymentP2020_05: {
    unique: db.PaymentP2020_05.WhereUniqueInput;
    insert: db.PaymentP2020_05.Insert;
    update: db.PaymentP2020_05.Update;
  };
  paymentP2020_06: {
    unique: db.PaymentP2020_06.WhereUniqueInput;
    insert: db.PaymentP2020_06.Insert;
    update: db.PaymentP2020_06.Update;
  };
  rental: {
    unique: db.Rental.WhereUniqueInput;
    insert: db.Rental.Insert;
    update: db.Rental.Update;
  };
  staff: {
    unique: db.Staff.WhereUniqueInput;
    insert: db.Staff.Insert;
    update: db.Staff.Update;
  };
  store: {
    unique: db.Store.WhereUniqueInput;
    insert: db.Store.Insert;
    update: db.Store.Update;
  };
  actorInfo: {
    unique: never;
    insert: never;
    update: never;
  };
  customerList: {
    unique: never;
    insert: never;
    update: never;
  };
  filmList: {
    unique: never;
    insert: never;
    update: never;
  };
  nicerButSlowerFilmList: {
    unique: never;
    insert: never;
    update: never;
  };
  salesByFilmCategory: {
    unique: never;
    insert: never;
    update: never;
  };
  salesByStore: {
    unique: never;
    insert: never;
    update: never;
  };
  staffList: {
    unique: never;
    insert: never;
    update: never;
  };
}

export const db = new Kysely<Database>({
  database: process.env.DATABASE_NAME!,
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  dialect: 'postgres',
  plugins: [new CamelCasePlugin()],
});

export class ActorRepository extends ORMLess<Database, 'actor', DatabaseMetadata> {
  protected table = 'actor' as const;
}
export class AddressRepository extends ORMLess<Database, 'address', DatabaseMetadata> {
  protected table = 'address' as const;
}
export class CategoryRepository extends ORMLess<Database, 'category', DatabaseMetadata> {
  protected table = 'category' as const;
}
export class CityRepository extends ORMLess<Database, 'city', DatabaseMetadata> {
  protected table = 'city' as const;
}
export class CountryRepository extends ORMLess<Database, 'country', DatabaseMetadata> {
  protected table = 'country' as const;
}
export class CustomerRepository extends ORMLess<Database, 'customer', DatabaseMetadata> {
  protected table = 'customer' as const;
}
export class FilmRepository extends ORMLess<Database, 'film', DatabaseMetadata> {
  protected table = 'film' as const;
}
export class FilmActorRepository extends ORMLess<Database, 'filmActor', DatabaseMetadata> {
  protected table = 'filmActor' as const;
}
export class FilmCategoryRepository extends ORMLess<Database, 'filmCategory', DatabaseMetadata> {
  protected table = 'filmCategory' as const;
}
export class InventoryRepository extends ORMLess<Database, 'inventory', DatabaseMetadata> {
  protected table = 'inventory' as const;
}
export class LanguageRepository extends ORMLess<Database, 'language', DatabaseMetadata> {
  protected table = 'language' as const;
}
export class PaymentRepository extends ORMLess<Database, 'payment', DatabaseMetadata> {
  protected table = 'payment' as const;
}
export class PaymentP2020_01Repository extends ORMLess<Database, 'paymentP2020_01', DatabaseMetadata> {
  protected table = 'paymentP2020_01' as const;
}
export class PaymentP2020_02Repository extends ORMLess<Database, 'paymentP2020_02', DatabaseMetadata> {
  protected table = 'paymentP2020_02' as const;
}
export class PaymentP2020_03Repository extends ORMLess<Database, 'paymentP2020_03', DatabaseMetadata> {
  protected table = 'paymentP2020_03' as const;
}
export class PaymentP2020_04Repository extends ORMLess<Database, 'paymentP2020_04', DatabaseMetadata> {
  protected table = 'paymentP2020_04' as const;
}
export class PaymentP2020_05Repository extends ORMLess<Database, 'paymentP2020_05', DatabaseMetadata> {
  protected table = 'paymentP2020_05' as const;
}
export class PaymentP2020_06Repository extends ORMLess<Database, 'paymentP2020_06', DatabaseMetadata> {
  protected table = 'paymentP2020_06' as const;
}
export class RentalRepository extends ORMLess<Database, 'rental', DatabaseMetadata> {
  protected table = 'rental' as const;
}
export class StaffRepository extends ORMLess<Database, 'staff', DatabaseMetadata> {
  protected table = 'staff' as const;
}
export class StoreRepository extends ORMLess<Database, 'store', DatabaseMetadata> {
  protected table = 'store' as const;
}

export class ActorInfoRepository extends ORMLessQueryable<Database, 'actorInfo', DatabaseMetadata> {
  protected table = 'actorInfo' as const;
}
export class CustomerListRepository extends ORMLessQueryable<Database, 'customerList', DatabaseMetadata> {
  protected table = 'customerList' as const;
}
export class FilmListRepository extends ORMLessQueryable<Database, 'filmList', DatabaseMetadata> {
  protected table = 'filmList' as const;
}
export class NicerButSlowerFilmListRepository extends ORMLessQueryable<
  Database,
  'nicerButSlowerFilmList',
  DatabaseMetadata
> {
  protected table = 'nicerButSlowerFilmList' as const;
}
export class SalesByFilmCategoryRepository extends ORMLessQueryable<Database, 'salesByFilmCategory', DatabaseMetadata> {
  protected table = 'salesByFilmCategory' as const;
}
export class SalesByStoreRepository extends ORMLessQueryable<Database, 'salesByStore', DatabaseMetadata> {
  protected table = 'salesByStore' as const;
}
export class StaffListRepository extends ORMLessQueryable<Database, 'staffList', DatabaseMetadata> {
  protected table = 'staffList' as const;
}
