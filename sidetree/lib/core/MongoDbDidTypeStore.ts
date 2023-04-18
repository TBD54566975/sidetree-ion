import DidTypeModel from './models/DidTypeModel';
import IDidTypeStore from './interfaces/IDidTypeStore';
import MongoDbStore from '../common/MongoDbStore';

/**
 * Implementation of DidTypeStore that stores the didtype data in
 * a MongoDB database.
 */
export default class MongoDbDidTypeStore extends MongoDbStore implements IDidTypeStore {
  /** MongoDB collection name under the database where the operations are stored. */
  public static readonly collectionName: string = 'didtype';

  constructor (serverUrl: string, databaseName: string) {
    super(serverUrl, MongoDbDidTypeStore.collectionName, databaseName);
  }

  public async createIndex () {
    await this.collection.createIndex({ didType: 1 });

  }

  public async insert (didTypes: DidTypeModel[]): Promise<void> {
    await this.collection.insertMany(didTypes);
  }

  public async get (didType: string): Promise<string[]> {
    const results = await this.collection.find({ didType: didType }).toArray();
    const didUniqueSuffixes = results.map(doc => doc.didUniqueSuffix);
    return didUniqueSuffixes;
  }

  public async delete (): Promise<void> {
    await this.collection!.deleteMany({});
  }
}
