/**
 * Provides builders for creating various instruction objects related to token operations,
 * including token update, token distribution, instruction creation, and more.
 * These builders follow the builder pattern, offering a fluent API for constructing complex objects step by step.
 */
import {
  TokenDistribution,
  TokenOrProgramUpdate,
  TokenUpdate,
  TokenUpdateField,
} from '@/lib/programs/Token'
import {
  BurnInstruction,
  CreateInstruction,
  Instruction,
  TransferInstruction,
  UpdateInstruction,
} from '@/lib/programs/Instruction'
import { Outputs } from '@/lib/programs/Outputs'
import { AddressOrNamespace, Address } from '@/lib/programs/Address-Namespace'
import { Token } from '@/lib/types'

/**
 * Builds token update instructions by aggregating individual updates and generating a final instruction object.
 */
export class TokenUpdateBuilder {
  private account: AddressOrNamespace | null
  private token: AddressOrNamespace | null
  private updates: TokenOrProgramUpdate[]

  constructor() {
    this.account = null
    this.token = null
    this.updates = []
  }

  /**
   * Adds an account address to the update instruction.
   * @param {AddressOrNamespace} account - The account address to be updated.
   * @returns {TokenUpdateBuilder} - The instance of this builder for chaining.
   */
  addUpdateAccountAddress(account: AddressOrNamespace): TokenUpdateBuilder {
    this.account = account
    return this
  }

  /**
   * Adds a token address to the update instruction.
   * @param {AddressOrNamespace} tokenAddress - The address of the token to be updated.
   * @returns {TokenUpdateBuilder} - The instance of this builder for chaining.
   */
  addTokenAddress(tokenAddress: AddressOrNamespace): TokenUpdateBuilder {
    this.token = tokenAddress
    return this
  }

  /**
   * Adds an update field to the token update instruction.
   * @param {TokenOrProgramUpdate} updateField - The update field to be added.
   * @returns {TokenUpdateBuilder} - The instance of this builder for chaining.
   */
  addUpdateField(updateField: TokenOrProgramUpdate): TokenUpdateBuilder {
    this.updates.push(updateField)
    return this
  }

  /**
   * Builds the token update instruction.
   * @returns {Instruction} - The constructed token update instruction.
   */
  build(): Instruction {
    return new Instruction(
      'update',
      new UpdateInstruction(this.updates.map((update) => update))
    )
  }
}

/**
 * Builds token distribution instructions, including details about program ID, receiver, amount, and token IDs.
 */
export class TokenDistributionBuilder {
  private programId: AddressOrNamespace | null
  private to: AddressOrNamespace | null
  private amount: string | null
  private tokenIds: string[]
  private updateFields: TokenUpdateField[]

  constructor() {
    this.programId = null
    this.to = null
    this.amount = null
    this.tokenIds = []
    this.updateFields = []
  }

  /**
   * Sets the program ID for the token distribution.
   * @param {AddressOrNamespace} programId - The program ID.
   * @returns {TokenDistributionBuilder} - The instance of this builder for chaining.
   */
  setProgramId(programId: AddressOrNamespace): TokenDistributionBuilder {
    this.programId = programId
    return this
  }

  /**
   * Sets the receiver address for the token distribution.
   * @param {AddressOrNamespace} receiver - The receiver's address.
   * @returns {TokenDistributionBuilder} - The instance of this builder for chaining.
   */
  setReceiver(receiver: AddressOrNamespace): TokenDistributionBuilder {
    this.to = receiver
    return this
  }

  /**
   * Sets the amount for the token distribution.
   * @param {string} amount - The amount to be distributed.
   * @returns {TokenDistributionBuilder} - The instance of this builder for chaining.
   */
  setAmount(amount: string): TokenDistributionBuilder {
    this.amount = amount
    return this
  }

  /**
   * Adds a single token ID to the distribution.
   * @param {string} tokenId - The token ID to add.
   * @returns {TokenDistributionBuilder} - The instance of this builder for chaining.
   */
  addTokenId(tokenId: string): TokenDistributionBuilder {
    this.tokenIds.push(tokenId)
    return this
  }

  /**
   * Extends the list of token IDs with multiple IDs.
   * @param {string[]} items - The list of token IDs to add.
   * @returns {TokenDistributionBuilder} - The instance of this builder for chaining.
   */
  extendTokenIds(items: string[]): TokenDistributionBuilder {
    this.tokenIds.push(...items)
    return this
  }

  /**
   * Adds an update field to the distribution.
   * @param {TokenUpdateField} updateField - The update field to add.
   * @returns {TokenDistributionBuilder} - The instance of this builder for chaining.
   */
  addUpdateField(updateField: TokenUpdateField): TokenDistributionBuilder {
    this.updateFields.push(updateField)
    return this
  }

  /**
   * Extends the list of update fields with multiple fields.
   * @param {TokenUpdateField[]} items - The list of update fields to add.
   * @returns {TokenDistributionBuilder} - The instance of this builder for chaining.
   */
  extendUpdateFields(items: TokenUpdateField[]): TokenDistributionBuilder {
    this.updateFields.push(...items)
    return this
  }

  /**
   * Builds the token distribution object.
   * @returns {TokenDistribution} - The constructed token distribution object.
   */
  build(): TokenDistribution {
    const programId =
      this.programId instanceof AddressOrNamespace
        ? (this.programId.toJson() as AddressOrNamespace)
        : this.programId ?? null

    const to =
      this.to instanceof AddressOrNamespace
        ? (this.to.toJson() as AddressOrNamespace)
        : this.to ?? null

    return new TokenDistribution(
      programId,
      to,
      this.amount,
      this.tokenIds.map((tokenId) => tokenId as string),
      this.updateFields.map((updateField) =>
        updateField.toJson()
      ) as TokenUpdateField[]
    )
  }
}

/**
 * A builder class for constructing a `CreateInstruction` object. This class provides a fluent API to set various properties of
 * a create instruction, such as program namespace, program ID, program owner, total supply, and initialized supply. Additionally,
 * it allows for the aggregation of multiple token distributions into the instruction. This class is part of a system that abstracts
 * complex instruction creation into manageable steps, improving code readability and maintainability.
 */
export class CreateInstructionBuilder {
  private programNamespace: AddressOrNamespace | null = null
  private programId: AddressOrNamespace | null = null
  private programOwner: Address | null = null
  private totalSupply: string | null = null
  private initializedSupply: string | null = null
  private distribution: TokenDistribution[] = []

  /**
   * Sets the program namespace for the instruction being built.
   * @param {AddressOrNamespace} programNamespace - The namespace of the program.
   * @returns {CreateInstructionBuilder} - The instance of this builder for method chaining.
   */
  setProgramNamespace(
    programNamespace: AddressOrNamespace
  ): CreateInstructionBuilder {
    this.programNamespace = programNamespace
    return this
  }

  /**
   * Sets the program ID for the instruction being built.
   * @param {AddressOrNamespace} programId - The ID of the program.
   * @returns {CreateInstructionBuilder} - The instance of this builder for method chaining.
   */
  setProgramId(programId: AddressOrNamespace): CreateInstructionBuilder {
    this.programId = programId
    return this
  }

  /**
   * Sets the program owner for the instruction being built.
   * @param {Address} programOwner - The owner of the program.
   * @returns {CreateInstructionBuilder} - The instance of this builder for method chaining.
   */
  setProgramOwner(programOwner: Address): CreateInstructionBuilder {
    this.programOwner = programOwner
    return this
  }

  /**
   * Sets the total supply for the token or program being created.
   * @param {string} totalSupply - The total supply as a string.
   * @returns {CreateInstructionBuilder} - The instance of this builder for method chaining.
   */
  setTotalSupply(totalSupply: string): CreateInstructionBuilder {
    this.totalSupply = totalSupply
    return this
  }

  /**
   * Sets the initialized supply for the token or program being created.
   * @param {string} initializedSupply - The initialized supply as a string.
   * @returns {CreateInstructionBuilder} - The instance of this builder for method chaining.
   */
  setInitializedSupply(initializedSupply: string): CreateInstructionBuilder {
    this.initializedSupply = initializedSupply
    return this
  }

  /**
   * Adds a single token distribution to the list of distributions that will be part of the create instruction.
   * @param {TokenDistribution} tokenDistribution - A token distribution object.
   * @returns {CreateInstructionBuilder} - The instance of this builder for method chaining.
   */
  addTokenDistribution(
    tokenDistribution: TokenDistribution
  ): CreateInstructionBuilder {
    this.distribution.push(tokenDistribution)
    return this
  }

  /**
   * Extends the list of token distributions with an array of token distribution objects.
   * @param {TokenDistribution[]} items - An array of token distribution objects.
   * @returns {CreateInstructionBuilder} - The instance of this builder for method chaining.
   */
  extendTokenDistribution(
    items: TokenDistribution[]
  ): CreateInstructionBuilder {
    this.distribution.push(...items)
    return this
  }

  /**
   * Builds and returns a new `Instruction` object of type `create`, encapsulating all the set properties and the aggregated
   * token distributions.
   * @returns {Instruction} - The constructed `CreateInstruction` object, ready to be used in the application.
   */
  build(): Instruction {
    return new Instruction(
      'create',
      new CreateInstruction(
        this.programNamespace,
        this.programId,
        this.programOwner,
        this.totalSupply,
        this.initializedSupply,
        this.distribution
      )
    )
  }
}

/**
 * A builder class for constructing an `UpdateInstruction` object. This class provides methods to add
 * updates to the instruction. It allows for chaining methods to configure an `UpdateInstruction` and
 * finally build it into an `Instruction` object.
 */
export class UpdateInstructionBuilder {
  private updates: TokenOrProgramUpdate[] = []

  /**
   * Adds a single update to the instruction.
   * @param update - A `TokenOrProgramUpdate` object to add to the update list.
   * @returns The instance of this builder for chaining.
   */
  addUpdate(update: TokenOrProgramUpdate): UpdateInstructionBuilder {
    this.updates.push(update)
    return this
  }

  /**
   * Extends the updates list with an array of `TokenOrProgramUpdate` objects.
   * @param items - An array of `TokenOrProgramUpdate` objects to add to the update list.
   * @returns The instance of this builder for chaining.
   */
  extendUpdates(items: TokenOrProgramUpdate[]): UpdateInstructionBuilder {
    this.updates.push(...items)
    return this
  }

  /**
   * Builds the update instruction using the configured updates.
   * @returns An `Instruction` object configured as an update instruction with the specified updates.
   */
  build(): Instruction {
    return new Instruction('update', new UpdateInstruction(this.updates))
  }
}

/**
 * A builder class for constructing a `TransferInstruction` object, facilitating the setting of various
 * properties relevant to a token transfer operation. This builder provides a fluent API for configuring
 * a transfer instruction step by step.
 */
export class TransferInstructionBuilder {
  private token: Address | null = null
  private transferFrom: AddressOrNamespace | null = null
  private transferTo: AddressOrNamespace | null = null
  private amount: string | null = null
  private ids: string[] = []

  /**
   * Sets the token address for the transfer.
   * @param {Address} tokenAddress - The address of the token to be transferred.
   * @returns {TransferInstructionBuilder} - The instance of this builder for chaining.
   */
  setTokenAddress(tokenAddress: Address): TransferInstructionBuilder {
    this.token = tokenAddress
    return this
  }

  /**
   * Sets the address from which the token will be transferred.
   * @param {AddressOrNamespace} transferFrom - The address or namespace from which the transfer originates.
   * @returns {TransferInstructionBuilder} - The instance of this builder for chaining.
   */
  setTransferFrom(
    transferFrom: AddressOrNamespace
  ): TransferInstructionBuilder {
    this.transferFrom = transferFrom
    return this
  }

  /**
   * Sets the destination address for the transferred token.
   * @param {AddressOrNamespace} transferTo - The address or namespace to which the token will be transferred.
   * @returns {TransferInstructionBuilder} - The instance of this builder for chaining.
   */
  setTransferTo(transferTo: AddressOrNamespace): TransferInstructionBuilder {
    this.transferTo = transferTo
    return this
  }

  /**
   * Sets the amount of the token to be transferred.
   * @param {string | null} amount - The amount of the token to transfer, represented as a string.
   * @returns {TransferInstructionBuilder} - The instance of this builder for chaining.
   */
  setAmount(amount: string | null): TransferInstructionBuilder {
    this.amount = amount
    return this
  }

  /**
   * Adds a list of token IDs to be transferred.
   * @param {string[]} tokenIds - An array of token IDs to be transferred.
   * @returns {TransferInstructionBuilder} - The instance of this builder for chaining.
   */
  addTokenIds(tokenIds: string[]): TransferInstructionBuilder {
    this.ids.push(...tokenIds)
    return this
  }

  /**
   * Extends the existing list of token IDs with additional IDs.
   * @param {string[]} items - An array of additional token IDs to be transferred.
   * @returns {TransferInstructionBuilder} - The instance of this builder for chaining.
   */
  extendTokenIds(items: string[]): TransferInstructionBuilder {
    this.ids.push(...items)
    return this
  }

  /**
   * Builds the `TransferInstruction` object using the properties set on the builder.
   * @returns {Instruction} - An `Instruction` object configured for a transfer operation, encapsulating
   * the transfer instruction details.
   */
  build(): Instruction {
    const token = this.token ?? null
    return new Instruction(
      'transfer',
      new TransferInstruction(
        token,
        this.transferFrom,
        this.transferTo,
        this.amount,
        this.ids
      )
    )
  }
}

/**
 * A builder class for constructing a `BurnInstruction` object, facilitating the configuration of properties
 * related to the burning of tokens. This builder offers a fluent API, allowing properties to be set in a
 * chained manner for ease of use and readability.
 */
export class BurnInstructionBuilder {
  private caller: Address | null = null
  private programId: AddressOrNamespace | null = null
  private token: Address | null = null
  private burnFrom: AddressOrNamespace | null = null
  private amount: string | null = null
  private tokenIds: string[] = []

  /**
   * Sets the caller's address, who initiates the burn operation.
   * @param {Address} caller - The address of the caller initiating the burn operation.
   * @returns {BurnInstructionBuilder} - The instance of this builder for chaining.
   */
  setCaller(caller: Address): BurnInstructionBuilder {
    this.caller = caller
    return this
  }

  /**
   * Sets the program ID associated with the burn operation.
   * @param {AddressOrNamespace} programId - The program ID.
   * @returns {BurnInstructionBuilder} - The instance of this builder for chaining.
   */
  setProgramId(programId: AddressOrNamespace): BurnInstructionBuilder {
    this.programId = programId
    return this
  }

  /**
   * Sets the token address of the tokens to be burned.
   * @param {Address} tokenAddress - The address of the token.
   * @returns {BurnInstructionBuilder} - The instance of this builder for chaining.
   */
  setTokenAddress(tokenAddress: Address): BurnInstructionBuilder {
    this.token = tokenAddress
    return this
  }

  /**
   * Sets the address from which the tokens will be burned.
   * @param {AddressOrNamespace} burnFromAddress - The address from which tokens are to be burned.
   * @returns {BurnInstructionBuilder} - The instance of this builder for chaining.
   */
  setBurnFromAddress(
    burnFromAddress: AddressOrNamespace
  ): BurnInstructionBuilder {
    this.burnFrom = burnFromAddress
    return this
  }

  /**
   * Sets the amount of tokens to be burned.
   * @param {string} amount - The amount of tokens to burn.
   * @returns {BurnInstructionBuilder} - The instance of this builder for chaining.
   */
  setAmount(amount: string): BurnInstructionBuilder {
    this.amount = amount
    return this
  }

  /**
   * Adds a single token ID to the list of tokens to be burned.
   * @param {string} tokenId - A token ID to be burned.
   * @returns {BurnInstructionBuilder} - The instance of this builder for chaining.
   */
  addTokenId(tokenId: string): BurnInstructionBuilder {
    this.tokenIds.push(tokenId)
    return this
  }

  /**
   * Extends the list of token IDs to be burned with additional token IDs.
   * @param {string[]} items - An array of token IDs to be added.
   * @returns {BurnInstructionBuilder} - The instance of this builder for chaining.
   */
  extendTokenIds(items: string[]): BurnInstructionBuilder {
    this.tokenIds.push(...items)
    return this
  }

  /**
   * Builds the burn instruction using the properties set on the builder.
   * @returns {Instruction} - An `Instruction` object configured for a burn operation, encapsulating
   * the details necessary to execute the burn.
   */
  build(): Instruction {
    return new Instruction(
      'burn',
      new BurnInstruction(
        this.caller,
        this.programId,
        this.token,
        this.burnFrom,
        this.amount,
        this.tokenIds
      )
    )
  }
}

export class LogInstructionBuilder {
  // Future implementation goes here
}

/**
 * A builder class designed for constructing an `Outputs` object, facilitating the configuration of input data
 * and a collection of instructions. This builder offers a fluent interface, enabling the incremental setup of
 * inputs and addition of various instructions before building the final `Outputs` object.
 */
export class OutputBuilder {
  private inputs = null
  private instructions: Instruction[] = []

  /**
   * Sets the input data for the `Outputs` object. This method allows any type of input data to be specified,
   * making the builder flexible for various use cases.
   *
   * @param {any} inputs - The input data to be used in the `Outputs` object.
   * @returns {OutputBuilder} - The instance of this builder for chaining.
   */
  setInputs(inputs: any): OutputBuilder {
    this.inputs = inputs
    return this
  }

  /**
   * Adds an `Instruction` object to the collection of instructions in the `Outputs` object. This method can be
   * called multiple times to add multiple instructions, supporting the construction of complex `Outputs` objects
   * with various operations.
   *
   * @param {Instruction} instruction - An instruction to be added to the `Outputs` object.
   * @returns {OutputBuilder} - The instance of this builder for chaining.
   */
  addInstruction(instruction: Instruction): OutputBuilder {
    this.instructions.push(instruction)
    return this
  }

  /**
   * Builds the `Outputs` object using the inputs and instructions configured via the builder. This method finalizes
   * the construction of the `Outputs` object and returns it, making it ready for use.
   *
   * @returns {Outputs} - The constructed `Outputs` object containing the specified inputs and instructions.
   */
  build(): Outputs {
    return new Outputs(this.inputs, this.instructions)
  }
}
