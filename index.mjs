import { initialize } from "zokrates-js";

async function main() {
  try {
    const zokratesProvider = await initialize();

    // Zokrates source code
    const source = `def main(private field x, private field y) -> bool { return x == y; }`;

    // Compilation
    const artifacts = await zokratesProvider.compile(source); // Add 'await' here

    // Computation
    const { witness, output } = await zokratesProvider.computeWitness(
      artifacts,
      ["1694350122", "1694350122"]
    );

    console.log("Output:", output);

    // Run setup
    const keypair = zokratesProvider.setup(artifacts.program);

    // Generate proof
    const proof = await zokratesProvider.generateProof(
      // Add 'await' here
      artifacts.program,
      witness,
      keypair.pk
    );
    // Or verify off-chain
    const isVerified = await zokratesProvider.verify(keypair.vk, proof); // Add 'await' here
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
