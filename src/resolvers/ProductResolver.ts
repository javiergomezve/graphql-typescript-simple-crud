import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
    Int,
} from 'type-graphql';
import { Product } from '../entity/Product';

@InputType()
class ProductInput {
    @Field()
    name!: string;

    @Field()
    quantity!: number;
}

@InputType()
class ProductUpdateType {
    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => Int, { nullable: true })
    quantity?: number;
}

@Resolver()
export class ProductResolver {
    @Mutation(() => Product)
    // async createProduct(
    //     @Arg('name') name: string,
    //     @Arg('quantity') quantity: number
    // ) {
    async createProduct(@Arg('input') input: ProductInput) {
        const product = await Product.create({ ...input }).save();
        return product;
    }

    @Query(() => [Product])
    products() {
        return Product.find();
    }

    @Mutation(() => Boolean)
    async deleteProduct(@Arg('id', () => Int) id: number): Promise<Boolean> {
        await Product.delete(id);
        return true;
    }

    @Mutation(() => Boolean)
    async updateProduct(
        @Arg('id', () => Int) id: number,
        @Arg('input', () => ProductUpdateType) input: ProductInput
    ): Promise<Boolean> {
        await Product.update({ id }, input);
        return true;
    }
}
