import { ORMLess, ORMLessQueryable } from '../src/ormless';

/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */

export namespace Database {
  export namespace Actor {
    export type Name = 'actor';
    export type Column = keyof Model;

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

    export type PrimaryKeyConstriant = 'customer_pkey';

    export type UniqueConstriants = 'customer_email_uk' | 'customer_pkey';

    export interface WhereUniqueInput {
      customerEmailUk: Pick<Model, 'email'>;
      customerPkey: Pick<Model, 'customerId'>;
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

    export type PrimaryKeyConstriant = 'film_actor_pkey';

    export type UniqueConstriants = 'film_actor_pkey';

    export interface WhereUniqueInput {
      filmActorPkey: Pick<Model, 'filmId' | 'actorId'>;
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

    export type PrimaryKeyConstriant = 'film_category_pkey';

    export type UniqueConstriants = 'film_category_pkey';

    export interface WhereUniqueInput {
      filmCategoryPkey: Pick<Model, 'categoryId' | 'filmId'>;
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
  export namespace PaymentP2020_01 {
    export type Name = 'payment_p2020_01';
    export type Column = keyof Model;

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
  export namespace PaymentP2020_02 {
    export type Name = 'payment_p2020_02';
    export type Column = keyof Model;

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
  export namespace PaymentP2020_03 {
    export type Name = 'payment_p2020_03';
    export type Column = keyof Model;

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
  export namespace PaymentP2020_04 {
    export type Name = 'payment_p2020_04';
    export type Column = keyof Model;

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
  export namespace PaymentP2020_05 {
    export type Name = 'payment_p2020_05';
    export type Column = keyof Model;

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
  export namespace PaymentP2020_06 {
    export type Name = 'payment_p2020_06';
    export type Column = keyof Model;

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

  export namespace ActorInfo {
    export type Name = 'actor_info';
    export type Column = keyof Model;

    export interface Model {
      actorId: number;
      firstName: string;
      lastName: string;
      filmInfo: string;
    }

    export interface Select extends Required<Model> {}
  }
  export namespace CustomerList {
    export type Name = 'customer_list';
    export type Column = keyof Model;

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
    export type Name = 'film_list';
    export type Column = keyof Model;

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
    export type Name = 'nicer_but_slower_film_list';
    export type Column = keyof Model;

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
    export type Name = 'sales_by_film_category';
    export type Column = keyof Model;

    export interface Model {
      category: string;
      totalSales: number;
    }

    export interface Select extends Required<Model> {}
  }
  export namespace SalesByStore {
    export type Name = 'sales_by_store';
    export type Column = keyof Model;

    export interface Model {
      store: string;
      manager: string;
      totalSales: number;
    }

    export interface Select extends Required<Model> {}
  }
  export namespace StaffList {
    export type Name = 'staff_list';
    export type Column = keyof Model;

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
  paymentP2020_01: Database.PaymentP2020_01.Select;
  paymentP2020_02: Database.PaymentP2020_02.Select;
  paymentP2020_03: Database.PaymentP2020_03.Select;
  paymentP2020_04: Database.PaymentP2020_04.Select;
  paymentP2020_05: Database.PaymentP2020_05.Select;
  paymentP2020_06: Database.PaymentP2020_06.Select;
  rental: Database.Rental.Select;
  staff: Database.Staff.Select;
  store: Database.Store.Select;
  actorInfo: Database.ActorInfo.Select;
  customerList: Database.CustomerList.Select;
  filmList: Database.FilmList.Select;
  nicerButSlowerFilmList: Database.NicerButSlowerFilmList.Select;
  salesByFilmCategory: Database.SalesByFilmCategory.Select;
  salesByStore: Database.SalesByStore.Select;
  staffList: Database.StaffList.Select;
}

export interface DatabaseMetadata {
  actor: {
    unique: Database.Actor.WhereUniqueInput;
    insert: Database.Actor.Insert;
    update: Database.Actor.Update;
  };
  address: {
    unique: Database.Address.WhereUniqueInput;
    insert: Database.Address.Insert;
    update: Database.Address.Update;
  };
  category: {
    unique: Database.Category.WhereUniqueInput;
    insert: Database.Category.Insert;
    update: Database.Category.Update;
  };
  city: {
    unique: Database.City.WhereUniqueInput;
    insert: Database.City.Insert;
    update: Database.City.Update;
  };
  country: {
    unique: Database.Country.WhereUniqueInput;
    insert: Database.Country.Insert;
    update: Database.Country.Update;
  };
  customer: {
    unique: Database.Customer.WhereUniqueInput;
    insert: Database.Customer.Insert;
    update: Database.Customer.Update;
  };
  film: {
    unique: Database.Film.WhereUniqueInput;
    insert: Database.Film.Insert;
    update: Database.Film.Update;
  };
  filmActor: {
    unique: Database.FilmActor.WhereUniqueInput;
    insert: Database.FilmActor.Insert;
    update: Database.FilmActor.Update;
  };
  filmCategory: {
    unique: Database.FilmCategory.WhereUniqueInput;
    insert: Database.FilmCategory.Insert;
    update: Database.FilmCategory.Update;
  };
  inventory: {
    unique: Database.Inventory.WhereUniqueInput;
    insert: Database.Inventory.Insert;
    update: Database.Inventory.Update;
  };
  language: {
    unique: Database.Language.WhereUniqueInput;
    insert: Database.Language.Insert;
    update: Database.Language.Update;
  };
  payment: {
    unique: Database.Payment.WhereUniqueInput;
    insert: Database.Payment.Insert;
    update: Database.Payment.Update;
  };
  paymentP2020_01: {
    unique: Database.PaymentP2020_01.WhereUniqueInput;
    insert: Database.PaymentP2020_01.Insert;
    update: Database.PaymentP2020_01.Update;
  };
  paymentP2020_02: {
    unique: Database.PaymentP2020_02.WhereUniqueInput;
    insert: Database.PaymentP2020_02.Insert;
    update: Database.PaymentP2020_02.Update;
  };
  paymentP2020_03: {
    unique: Database.PaymentP2020_03.WhereUniqueInput;
    insert: Database.PaymentP2020_03.Insert;
    update: Database.PaymentP2020_03.Update;
  };
  paymentP2020_04: {
    unique: Database.PaymentP2020_04.WhereUniqueInput;
    insert: Database.PaymentP2020_04.Insert;
    update: Database.PaymentP2020_04.Update;
  };
  paymentP2020_05: {
    unique: Database.PaymentP2020_05.WhereUniqueInput;
    insert: Database.PaymentP2020_05.Insert;
    update: Database.PaymentP2020_05.Update;
  };
  paymentP2020_06: {
    unique: Database.PaymentP2020_06.WhereUniqueInput;
    insert: Database.PaymentP2020_06.Insert;
    update: Database.PaymentP2020_06.Update;
  };
  rental: {
    unique: Database.Rental.WhereUniqueInput;
    insert: Database.Rental.Insert;
    update: Database.Rental.Update;
  };
  staff: {
    unique: Database.Staff.WhereUniqueInput;
    insert: Database.Staff.Insert;
    update: Database.Staff.Update;
  };
  store: {
    unique: Database.Store.WhereUniqueInput;
    insert: Database.Store.Insert;
    update: Database.Store.Update;
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

export class ActorRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'actor'> {
  protected table = 'actor' as const;
}
export class AddressRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'address'> {
  protected table = 'address' as const;
}
export class CategoryRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'category'> {
  protected table = 'category' as const;
}
export class CityRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'city'> {
  protected table = 'city' as const;
}
export class CountryRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'country'> {
  protected table = 'country' as const;
}
export class CustomerRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'customer'> {
  protected table = 'customer' as const;
}
export class FilmRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'film'> {
  protected table = 'film' as const;
}
export class FilmActorRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'filmActor'> {
  protected table = 'filmActor' as const;
}
export class FilmCategoryRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'filmCategory'> {
  protected table = 'filmCategory' as const;
}
export class InventoryRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'inventory'> {
  protected table = 'inventory' as const;
}
export class LanguageRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'language'> {
  protected table = 'language' as const;
}
export class PaymentRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'payment'> {
  protected table = 'payment' as const;
}
export class PaymentP2020_01Repository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'paymentP2020_01'> {
  protected table = 'paymentP2020_01' as const;
}
export class PaymentP2020_02Repository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'paymentP2020_02'> {
  protected table = 'paymentP2020_02' as const;
}
export class PaymentP2020_03Repository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'paymentP2020_03'> {
  protected table = 'paymentP2020_03' as const;
}
export class PaymentP2020_04Repository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'paymentP2020_04'> {
  protected table = 'paymentP2020_04' as const;
}
export class PaymentP2020_05Repository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'paymentP2020_05'> {
  protected table = 'paymentP2020_05' as const;
}
export class PaymentP2020_06Repository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'paymentP2020_06'> {
  protected table = 'paymentP2020_06' as const;
}
export class RentalRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'rental'> {
  protected table = 'rental' as const;
}
export class StaffRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'staff'> {
  protected table = 'staff' as const;
}
export class StoreRepository extends ORMLess<DatabaseSchema, DatabaseMetadata, 'store'> {
  protected table = 'store' as const;
}
export class ActorInfoRepository extends ORMLessQueryable<DatabaseSchema, DatabaseMetadata, 'actorInfo'> {
  protected table = 'actorInfo' as const;
}
export class CustomerListRepository extends ORMLessQueryable<DatabaseSchema, DatabaseMetadata, 'customerList'> {
  protected table = 'customerList' as const;
}
export class FilmListRepository extends ORMLessQueryable<DatabaseSchema, DatabaseMetadata, 'filmList'> {
  protected table = 'filmList' as const;
}
export class NicerButSlowerFilmListRepository extends ORMLessQueryable<
  DatabaseSchema,
  DatabaseMetadata,
  'nicerButSlowerFilmList'
> {
  protected table = 'nicerButSlowerFilmList' as const;
}
export class SalesByFilmCategoryRepository extends ORMLessQueryable<
  DatabaseSchema,
  DatabaseMetadata,
  'salesByFilmCategory'
> {
  protected table = 'salesByFilmCategory' as const;
}
export class SalesByStoreRepository extends ORMLessQueryable<DatabaseSchema, DatabaseMetadata, 'salesByStore'> {
  protected table = 'salesByStore' as const;
}
export class StaffListRepository extends ORMLessQueryable<DatabaseSchema, DatabaseMetadata, 'staffList'> {
  protected table = 'staffList' as const;
}
