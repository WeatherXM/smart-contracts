# WeatherXMStationsRegistry

This contract is a registry of the approved station models that are accepted in the WeatherXM network.

The contract is using OpenZeppelin’s AccessControlEnumerableUpgradeable contract for fine-grained access control. The two roles that are defined are the following:

- `STATIONS_MANAGER_ROLE`: Allows adding/updating station types

The `STATIONS_MANAGER_ROLE` is managed by the DEFAULT_ADMIN_ROLE which on deployment is set to the deployer of the contract.

## Adding new types

New types can be added by the `STATIONS_MANAGER_ROLE` using the `addStation(string memory model, string memory metadataURI)` function. If the station model already exists the transaction will revert.

## Reading station types

The `stationExists(string model)` function can be used to check if a station model exists.

The `stations(string model)` function can be used to get details for a station model.

## Updating stations

The `STATIONS_MANAGER_ROLE` can use the `setDecommissioned(string model, bool decommissioned)` function to update the `decommissioned` status of the specified model.
The `STATIONS_MANAGER_ROLE` can use the `setURI(string model, bool metadataURI)` function to update the `metadataURI` of the specified model.